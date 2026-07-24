import { buildListRouteSchema } from '../../shared/schemas/common.schema';

const productItemSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },

    name: {
      type: 'string',
    },

    status: {
      type: 'string',
      enum: ['PUBLISHED', 'ARCHIVED', 'DRAFT'],
    },

    categoryId: {
      type: 'string',
    },

    category: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },

        name: {
          type: 'string',
        },

        description: {
          type: ['string', 'null'],
        },
      },

      required: ['id', 'name', 'description'],
    },

    specifications: {
      type: 'object',
      description:
        'Product specifications mapped using specification field keys.',
      additionalProperties: {
        type: 'string',
      },
    },

    createdAt: {
      type: 'string',
      format: 'date-time',
    },

    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },

  required: [
    'id',
    'name',
    'status',
    'categoryId',
    'category',
    'specifications',
    'createdAt',
    'updatedAt',
  ],
};

export const getProductsSchema = {
  querystring: {
    type: 'object',

    properties: {
      categoryId: {
        type: 'string',
        minLength: 1,
        description: 'ID of the product category',
      },
    },

    required: ['categoryId'],
  },

  ...buildListRouteSchema(productItemSchema),
};