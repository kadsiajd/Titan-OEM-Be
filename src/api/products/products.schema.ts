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

        imageUrl: {
          type: 'string',
        },
      },

      required: ['id', 'name', 'shortDescription', 'briefDescription', 'imageUrl'],
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

          imageUrl: {
            type: 'string',
          },

          fileName: {
            type: 'string',
          },

          displayOrder: {
            type: 'integer',
          },
        },

        required: ['id', 'filePathId', 'filePath', 'imageUrl', 'fileName', 'displayOrder'],
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

    documents: {
      type: 'array',

      items: {
        type: 'object',

        properties: {
          id: {
            type: 'string',
          },

          fileId: {
            type: 'string',
          },

          fileType: {
            type: 'string',
            enum: ['SPEC_SHEET', 'TECHNICAL_DRAWING'],
          },

          fileName: {
            type: 'string',
          },

          fileUrl: {
            type: 'string',
          },

        },

        required: ['id', 'fileId', 'fileType', 'fileName', 'fileUrl'],
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
    'documents',
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

const fileSchema = {
  type: ['object', 'null'],
  properties: {
    id: { type: 'string' },
    fileName: { type: 'string' },
    fileUrl: { type: 'string' },
  },
  required: ['id', 'fileName', 'fileUrl'],
};

const getAllProductItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    category: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        imageUrl: { type: 'string' },
      },
      required: ['id', 'name', 'imageUrl'],
    },
    image: {
      type: ['object', 'null'],
      properties: {
        id: { type: 'string' },
        fileName: { type: 'string' },
        imageUrl: { type: 'string' },
        displayOrder: { type: 'integer' },
      },
      required: ['id', 'fileName', 'imageUrl', 'displayOrder'],
    },
    specSheet: fileSchema,
    technicalDrawing: fileSchema,
  },
  required: ['id', 'name', 'description', 'category', 'image', 'specSheet', 'technicalDrawing'],
};

export const getAllProductsSchema = {
  querystring: {
    type: 'object',
    properties: {
      categoryId: {
        type: 'string',
        minLength: 1,
        description: 'ID of the product category',
      },
      search: {
        type: 'string',
        minLength: 1,
        description: 'Searches product names and descriptions',
      },
    },
  },
  ...buildListRouteSchema(getAllProductItemSchema),
};
