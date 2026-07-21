import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import { env } from '../config/env';

async function swaggerPlugin(fastify: FastifyInstance) {
  if (!env.SWAGGER_ENABLED) return;

  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Titan OEM API',
        description: 'Titan OEM Backend API Documentation',
        version: '1.0.0',
      },
      servers: [
        {
          url: `http://localhost:${env.PORT}`,
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
  });
}

export default fp(swaggerPlugin, {
  name: 'swagger',
});
