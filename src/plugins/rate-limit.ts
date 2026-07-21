import fp from 'fastify-plugin';
import rateLimit from '@fastify/rate-limit';
import { FastifyInstance } from 'fastify';
import { env } from '../config/env';
import { ErrorResponse } from '../shared/types/response.interface';

async function rateLimitPlugin(fastify: FastifyInstance) {
  await fastify.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_TIME_WINDOW,
    ban: 3,
    keyGenerator: (request) => request.ip,
    addHeadersOnExceeding: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
    },
    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
      'retry-after': true,
    },
    errorResponseBuilder: (_request, context) => {
      const response: ErrorResponse = {
        success: false,
        message: 'Too many requests, please try again later',
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          details: [
            {
              message: `Rate limit exceeded. Try again in ${Math.ceil(context.ttl / 1000)} seconds`,
            },
          ],
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      };

      return response;
    },
  });
}

export default fp(rateLimitPlugin, {
  name: 'rate-limit',
});
