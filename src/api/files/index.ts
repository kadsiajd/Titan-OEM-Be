import { FastifyInstance } from 'fastify';
import filesRoutes from './files.routes';

export default async (fastify: FastifyInstance) => {
  for (const route of filesRoutes) {
    fastify.route(route);
  }
};
