import { buildListRouteSchema } from '../../shared/schemas/common.schema';

const categoryItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    shortDescription: { type: 'string' },
    briefDescription: { type: ['string', 'null'] },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }, 
    imageUrl: { type: 'string' },
  },
  required: ['id', 'name', 'shortDescription', 'imageUrl'],
};

export const getCategoriesSchema = buildListRouteSchema(categoryItemSchema);
