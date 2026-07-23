import { describe, it, expect } from 'vitest';
import {
  metaSchema,
  errorSchema,
  buildSuccessSchema,
  buildErrorSchema,
  buildListRouteSchema,
  buildCreateRouteSchema,
} from '../../../src/shared/schemas/common.schema';

describe('buildSuccessSchema', () => {
  it('wraps the given data schema in the success envelope', () => {
    const itemSchema = { type: 'object', properties: { id: { type: 'string' } } };

    expect(buildSuccessSchema(itemSchema)).toEqual({
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: itemSchema,
        meta: metaSchema,
      },
      required: ['success', 'message', 'data', 'meta'],
    });
  });
});

describe('buildErrorSchema', () => {
  it('builds the error envelope', () => {
    expect(buildErrorSchema()).toEqual({
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        error: errorSchema,
        meta: metaSchema,
      },
      required: ['success', 'message', 'error', 'meta'],
    });
  });
});

describe('buildListRouteSchema', () => {
  it('builds a 200 array-of-items success response and a 500 error response', () => {
    const itemSchema = { type: 'object', properties: { id: { type: 'string' } } };

    const result = buildListRouteSchema(itemSchema);

    expect(result).toEqual({
      response: {
        200: buildSuccessSchema({ type: 'array', items: itemSchema }),
        500: buildErrorSchema(),
      },
    });
  });
});

describe('buildCreateRouteSchema', () => {
  it('defaults the success status code to 201', () => {
    const itemSchema = { type: 'object', properties: { id: { type: 'string' } } };

    const result = buildCreateRouteSchema(itemSchema);

    expect(result).toEqual({
      response: {
        201: buildSuccessSchema(itemSchema),
        400: buildErrorSchema(),
        500: buildErrorSchema(),
      },
    });
  });

  it('allows a custom success status code', () => {
    const itemSchema = { type: 'object', properties: { id: { type: 'string' } } };

    const result = buildCreateRouteSchema(itemSchema, 200);

    expect(result.response[200]).toEqual(buildSuccessSchema(itemSchema));
    expect(result.response[201]).toBeUndefined();
  });
});
