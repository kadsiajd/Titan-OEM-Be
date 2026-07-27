import { buildListRouteSchema } from '../../shared/schemas/common.schema';

const customerItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    logoUrl: { type: ['string', 'null'] },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
};

export const getCustomersSchema = buildListRouteSchema(customerItemSchema);
