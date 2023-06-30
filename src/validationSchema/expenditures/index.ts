import * as yup from 'yup';

export const expenditureValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  description: yup.string(),
  business_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
