import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from './AppError';
import { ErrorResponse } from '../types/response.interface';
import { env } from '../../config/env';
import { mapPrismaError } from './prisma-error';

function sendAppError(reply: FastifyReply, error: AppError) {
  const response: ErrorResponse = {
    success: false,
    message: error.message,
    error: {
      code: error.code,
      ...(error.details && { details: error.details }),
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  };

  return reply.status(error.statusCode).send(response);
}

export function errorHandler(
  error: FastifyError | AppError | Error,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof AppError) {
    return sendAppError(reply, error);
  }

  const prismaError = mapPrismaError(error);
  if (prismaError) {
    return sendAppError(reply, prismaError);
  }

  if ('validation' in error && error.validation) {
    const details = error.validation.map((v) => ({
      field: v.instancePath?.replace(/^\//, '') || undefined,
      message: v.message || 'Validation error',
    }));

    const response: ErrorResponse = {
      success: false,
      message: 'Validation failed',
      error: {
        code: 'VALIDATION_ERROR',
        details,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    return reply.status(400).send(response);
  }

  if ('statusCode' in error && error.statusCode === 429) {
    const response: ErrorResponse = {
      success: false,
      message: 'Too many requests, please try again later',
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    return reply.status(429).send(response);
  }

  const statusCode = 'statusCode' in error && error.statusCode ? error.statusCode : 500;

  if (env.NODE_ENV === 'development') {
    console.error(error);
  }

  const response: ErrorResponse = {
    success: false,
    message: statusCode === 500 ? 'Internal server error' : error.message,
    error: {
      code: 'INTERNAL_ERROR',
      ...(env.NODE_ENV === 'development' && {
        details: [{ message: error.message }],
      }),
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  };

  return reply.status(statusCode).send(response);
}
