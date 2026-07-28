import { FastifyInstance } from 'fastify';
import productDocumentsRoutes from './product-documents.routes';

export default async (fastify: FastifyInstance) => {
  for (const route of productDocumentsRoutes) {
    fastify.route(route);
  }
};
