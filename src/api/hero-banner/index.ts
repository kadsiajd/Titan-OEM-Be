import { FastifyInstance } from 'fastify';
import heroBannerRoutes from './hero-banner.routes';

export default async (fastify: FastifyInstance) => {
  for (const route of heroBannerRoutes) {
    fastify.route(route);
  }
};
