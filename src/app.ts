import Fastify from 'fastify';
import path from 'path';
import autoLoad from '@fastify/autoload';
import { errorHandler } from './shared/errors/error-handler';

import helmetPlugin from './plugins/helmet';
import corsPlugin from './plugins/cors';
import rateLimitPlugin from './plugins/rate-limit';
import jwtPlugin from './plugins/jwt';
import swaggerPlugin from './plugins/swagger';
import prismaPlugin from './plugins/prisma';

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transport:
        process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
    },
  });

  app.setErrorHandler(errorHandler);

  await app.register(helmetPlugin);
  await app.register(corsPlugin);
  await app.register(rateLimitPlugin);
  await app.register(jwtPlugin);
  await app.register(prismaPlugin);
  await app.register(swaggerPlugin);

  await app.register(autoLoad, {
    dir: path.join(__dirname, 'api'),
    dirNameRoutePrefix: false,
  });

  return app;
}
