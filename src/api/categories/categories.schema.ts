import { buildListRouteSchema } from '../../shared/schemas/common.schema';

const categoryItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    imageUrl: { type: 'string' },
  },
  required: ['id', 'name', 'description', 'imageUrl'],
};

export const getCategoriesSchema = buildListRouteSchema(categoryItemSchema);
