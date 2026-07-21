import { FastifyInstance } from 'fastify';
import authRoutes from './auth.routes';

export default async (fastify: FastifyInstance) => {
  for (const route of authRoutes) {
    fastify.route(route);
  }
};
