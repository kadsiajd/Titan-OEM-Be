import { FastifyInstance } from 'fastify';
import enquiryRoutes from './enquiries.routes';

export default async (fastify: FastifyInstance) => {
  for (const route of enquiryRoutes) {
    fastify.route(route);
  }
};
