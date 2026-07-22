export const getCustomersSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
        },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              logoUrl: {
                type: ['string', 'null'],
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
              'logoUrl',
              'createdAt',
              'updatedAt',
            ],
          },
        },
      },
      required: ['success', 'data'],
    },

    500: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
        },
        message: {
          type: 'string',
        },
      },
      required: ['success', 'message'],
    },
  },
};