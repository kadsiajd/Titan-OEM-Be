export const getProductCategoriesSchema = {
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
            },
            required: ['id', 'name'],
          },
        },
      },
      required: ['success', 'data'],
    },
  },
};

export const getProductsSchema = {
  querystring: {
    type: 'object',
    properties: {
      category: {
        type: 'string',
        minLength: 1,
      },
    },
    required: ['category'],
  },

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

              description: {
                type: 'string',
              },

              categoryId: {
                type: 'string',
              },

              category: {
                type: 'string',
              },

              imageUrl: {
                type: 'string',
              },

              specificationSheetUrl: {
                type: 'string',
              },

              technicalDrawingUrl: {
                type: 'string',
              },

              overview: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    label: {
                      type: 'string',
                    },

                    value: {
                      type: 'string',
                    },
                  },

                  required: ['label', 'value'],
                },
              },
            },

            required: [
              'id',
              'name',
              'description',
              'categoryId',
              'category',
              'imageUrl',
              'specificationSheetUrl',
              'technicalDrawingUrl',
              'overview',
            ],
          },
        },
      },

      required: ['success', 'data'],
    },

    400: {
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