import * as yup from 'yup';

export const createNotificationValidation = yup.object({
  action: yup.string().required().max(200).label('Action'),
  agent: yup.string().required().max(45).label('Agent'),
  client_nom: yup.string().max(45).label('Client nom'),
  client_prenom: yup.string().max(45).label('Client prenom'),
  date: yup.string().notRequired().default('').label('Date'),
  mail: yup.string().email().notRequired().default('').max(45).label('E-mail'),
  order_id: yup.string().default('').max(90).label('Order id'),
});

export type CreateNotificationSchema = yup.InferType<typeof createNotificationValidation>;

export interface CreateNotificationArgs {
  input: CreateNotificationSchema;
}
