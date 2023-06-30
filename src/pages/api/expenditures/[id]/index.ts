import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { expenditureValidationSchema } from 'validationSchema/expenditures';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.expenditure
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getExpenditureById();
    case 'PUT':
      return updateExpenditureById();
    case 'DELETE':
      return deleteExpenditureById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getExpenditureById() {
    const data = await prisma.expenditure.findFirst(convertQueryToPrismaUtil(req.query, 'expenditure'));
    return res.status(200).json(data);
  }

  async function updateExpenditureById() {
    await expenditureValidationSchema.validate(req.body);
    const data = await prisma.expenditure.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteExpenditureById() {
    const data = await prisma.expenditure.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
