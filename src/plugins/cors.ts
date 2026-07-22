import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';
import { env } from '../config/env';

const LOCALHOST_ORIGIN = /^https?:\/\/localhost:\d+$/;

async function corsPlugin(fastify: FastifyInstance) {
  const allowedOrigins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim());

  await fastify.register(cors, {
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (env.NODE_ENV !== 'production' && LOCALHOST_ORIGIN.test(origin)) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'), false);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Length', 'X-RateLimit-Limit', 'X-RateLimit-Remaining'],
    credentials: true,
    maxAge: 86400,
  });
}

export default fp(corsPlugin, {
  name: 'cors',
});
