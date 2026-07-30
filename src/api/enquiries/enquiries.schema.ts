import { z } from 'zod';
import { buildCreateRouteSchema } from '../../shared/schemas/common.schema';

export const createEnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .regex(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
  company: z.string().trim().min(1, 'Company name is required'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || (/^\+?[0-9\s()-]+$/.test(val) && /\d/.test(val)),
      'Enter a valid phone number',
    ),
  message: z.string().trim().optional(),
});

export type CreateEnquiryBody = z.infer<typeof createEnquirySchema>;

const enquiryItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    phone: { type: ['string', 'null'] },
    message: { type: ['string', 'null'] },
    createdAt: { type: 'string', format: 'date-time' },
  },
  required: ['id', 'name', 'company', 'email', 'phone', 'message', 'createdAt'],
};

export const createEnquiryResponseSchema = buildCreateRouteSchema(enquiryItemSchema);
