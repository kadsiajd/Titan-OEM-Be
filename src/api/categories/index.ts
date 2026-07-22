import { FastifyInstance } from 'fastify';
import categoryRoutes from './categories.routes';

export default async (fastify: FastifyInstance) => {
  for (const route of categoryRoutes) {
    fastify.route(route);
  }
};
