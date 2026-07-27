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

    description: {
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

        shortDescription: {
          type: 'string',
        },

        briefDescription: {
          type: ['string', 'null'],
        },
      },

      required: ['id', 'name', 'shortDescription', 'briefDescription'],
    },

    images: {
      type: 'array',

      items: {
        type: 'object',

        properties: {
          id: {
            type: 'string',
          },

          filePathId: {
            type: 'string',
          },

          filePath: {
            type: 'string',
          },

          fileName: {
            type: 'string',
          },

          displayOrder: {
            type: 'integer',
          },
        },

        required: ['id', 'filePathId', 'filePath', 'fileName', 'displayOrder'],
      },
    },

    specifications: {
      type: 'array',

      items: {
        type: 'object',

        properties: {
          fieldKey: {
            type: 'string',
          },

          fieldName: {
            type: 'string',
          },

          value: {
            type: 'string',
          },

          displayInCard: {
            type: 'boolean',
          },

          displayOrder: {
            type: 'integer',
          },
        },

        required: ['fieldKey', 'fieldName', 'value', 'displayInCard', 'displayOrder'],
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
    'description',
    'category',
    'images',
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
