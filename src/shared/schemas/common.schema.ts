export const metaSchema = {
  type: 'object',
  properties: {
    timestamp: { type: 'string', format: 'date-time' },
  },
  required: ['timestamp'],
};

export const errorSchema = {
  type: 'object',
  properties: {
    code: { type: 'string' },
    details: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          field: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
  required: ['code'],
};

export function buildSuccessSchema(dataSchema: object) {
  return {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      message: { type: 'string' },
      data: dataSchema,
      meta: metaSchema,
    },
    required: ['success', 'message', 'data', 'meta'],
  };
}

export function buildErrorSchema() {
  return {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      message: { type: 'string' },
      error: errorSchema,
      meta: metaSchema,
    },
    required: ['success', 'message', 'error', 'meta'],
  };
}

export function buildListRouteSchema(itemSchema: object) {
  return {
    response: {
      200: buildSuccessSchema({ type: 'array', items: itemSchema }),
      500: buildErrorSchema(),
    },
  };
}

export function buildCreateRouteSchema(itemSchema: object, successStatusCode = 201) {
  return {
    response: {
      [successStatusCode]: buildSuccessSchema(itemSchema),
      400: buildErrorSchema(),
      500: buildErrorSchema(),
    },
  };
}
