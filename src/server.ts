import { buildApp } from './app';
import { env } from './config/env';

async function start() {
  let app: Awaited<ReturnType<typeof buildApp>> | undefined;

  try {
    app = await buildApp();
    let isShuttingDown = false;

    const shutdown = async (signal: NodeJS.Signals) => {
      if (isShuttingDown || !app) return;
      isShuttingDown = true;

      app.log.info({ signal }, 'Shutdown signal received');

      try {
        await app.close();
        app.log.info('Server closed gracefully');
        process.exitCode = 0;
      } catch (error) {
        app.log.error(error, 'Failed to close server gracefully');
        process.exitCode = 1;
      }
    };

    process.once('SIGTERM', () => void shutdown('SIGTERM'));
    process.once('SIGINT', () => void shutdown('SIGINT'));

    await app.listen({ port: env.PORT, host: env.HOST });
  } catch (error) {
    if (app) {
      app.log.error(error, 'Failed to start server');

      try {
        await app.close();
      } catch (closeError) {
        app.log.error(closeError, 'Failed to close app after startup error');
      }
    } else {
      console.error('Failed to build application', error);
    }

    process.exitCode = 1;
  }
}

void start();
