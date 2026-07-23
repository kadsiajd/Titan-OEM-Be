import { describe, it, expect, vi } from 'vitest';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { Prisma } from '@prisma/client';
import { errorHandler } from '../../../src/shared/errors/error-handler';
import { NotFoundError, ValidationError } from '../../../src/shared/errors/AppError';
import { env } from '../../../src/config/env';

function createMockReply() {
  const reply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };
  return reply as unknown as FastifyReply;
}

const mockRequest = {} as FastifyRequest;

describe('errorHandler', () => {
  it('formats an AppError using its own status code and error code', () => {
    const reply = createMockReply();

    errorHandler(new NotFoundError('Category not found'), mockRequest, reply);

    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: 'Category not found',
        error: { code: 'NOT_FOUND' },
        meta: expect.objectContaining({ timestamp: expect.any(String) }),
      }),
    );
  });

  it('includes details on the error when the AppError carries them', () => {
    const reply = createMockReply();
    const details = [{ field: 'email', message: 'Invalid email' }];

    errorHandler(new ValidationError('Validation failed', details), mockRequest, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: { code: 'VALIDATION_ERROR', details },
      }),
    );
  });

  it('maps a known Prisma error to its corresponding AppError response', () => {
    const reply = createMockReply();
    const prismaError = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2002',
      clientVersion: 'test',
    });

    errorHandler(prismaError, mockRequest, reply);

    expect(reply.status).toHaveBeenCalledWith(409);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: { code: 'UNIQUE_CONSTRAINT_VIOLATION' },
      }),
    );
  });

  it('formats a Fastify schema validation error as a 400 VALIDATION_ERROR', () => {
    const reply = createMockReply();
    const validationError = {
      message: 'body must have required property name',
      validation: [
        { instancePath: '/name', message: 'must be string' },
        { instancePath: '', message: undefined },
      ],
    } as unknown as FastifyError;

    errorHandler(validationError, mockRequest, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: 'Validation failed',
        error: {
          code: 'VALIDATION_ERROR',
          details: [
            { field: 'name', message: 'must be string' },
            { field: undefined, message: 'Validation error' },
          ],
        },
      }),
    );
  });

  it('formats a rate-limit error as a 429 RATE_LIMIT_EXCEEDED', () => {
    const reply = createMockReply();
    const rateLimitError = { statusCode: 429, message: 'Too Many Requests' } as FastifyError;

    errorHandler(rateLimitError, mockRequest, reply);

    expect(reply.status).toHaveBeenCalledWith(429);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Too many requests, please try again later',
        error: { code: 'RATE_LIMIT_EXCEEDED' },
      }),
    );
  });

  it('falls back to a 500 INTERNAL_ERROR for an unrecognized error', () => {
    const reply = createMockReply();

    errorHandler(new Error('Something exploded'), mockRequest, reply);

    expect(reply.status).toHaveBeenCalledWith(500);
    const [response] = (reply.send as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(response.success).toBe(false);
    expect(response.message).toBe('Internal server error');
    expect(response.error.code).toBe('INTERNAL_ERROR');

    if (env.NODE_ENV === 'development') {
      expect(response.error.details).toEqual([{ message: 'Something exploded' }]);
    } else {
      expect(response.error.details).toBeUndefined();
    }
  });

  it('preserves a custom error message for a non-500 unrecognized error', () => {
    const reply = createMockReply();
    const teapotError = { statusCode: 418, message: "I'm a teapot" } as FastifyError;

    errorHandler(teapotError, mockRequest, reply);

    expect(reply.status).toHaveBeenCalledWith(418);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: "I'm a teapot" }),
    );
  });
});
