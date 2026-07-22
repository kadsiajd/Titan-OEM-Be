import { FastifyInstance } from 'fastify';
import customerRoutes from './customers.routes';

export default async (fastify: FastifyInstance) => {
  for (const route of customerRoutes) {
    fastify.route(route);
  }
};
