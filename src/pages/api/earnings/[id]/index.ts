import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { earningValidationSchema } from 'validationSchema/earnings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.earning
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEarningById();
    case 'PUT':
      return updateEarningById();
    case 'DELETE':
      return deleteEarningById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEarningById() {
    const data = await prisma.earning.findFirst(convertQueryToPrismaUtil(req.query, 'earning'));
    return res.status(200).json(data);
  }

  async function updateEarningById() {
    await earningValidationSchema.validate(req.body);
    const data = await prisma.earning.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEarningById() {
    const data = await prisma.earning.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
