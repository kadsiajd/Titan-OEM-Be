import { FastifyInstance } from 'fastify';
import productsRoutes from './products.routes';

export default async (fastify: FastifyInstance) => {
  for (const route of productsRoutes) {
    fastify.route(route);
  }
};
