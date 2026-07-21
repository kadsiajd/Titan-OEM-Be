import { FastifyReply } from 'fastify';
import { SuccessResponse, PaginationParams } from '../types/response.interface';

function buildMeta(pagination?: PaginationParams) {
  const meta: SuccessResponse['meta'] = {
    timestamp: new Date().toISOString(),
  };

  if (pagination) {
    meta.pagination = {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages: Math.ceil(pagination.total / pagination.limit) || 0,
    };
  }

  return meta;
}

interface SendSuccessOptions<T> {
  message: string;
  data: T;
  statusCode?: number;
  pagination?: PaginationParams;
}

export function sendSuccess<T>(
  reply: FastifyReply,
  { message, data, statusCode = 200, pagination }: SendSuccessOptions<T>,
) {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    data,
    meta: buildMeta(pagination),
  };

  return reply.status(statusCode).send(response);
}
