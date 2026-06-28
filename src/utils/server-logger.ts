if (typeof window !== 'undefined' || import.meta.env?.CLIENT) {
  throw new Error(
    '[Server Logger]: Este módulo solo puede ser importado y ejecutado en el entorno de servidor (Astro SSR). No debe incluirse en el bundle del cliente.',
  );
}

import pino from 'pino';

const isProduction =
  process.env.NODE_ENV === 'production' || import.meta.env?.PROD === true;

const baseMetadata = {
  project: process.env.PUBLIC_APP_NAME || 'landingpagev2',
  env: process.env.NODE_ENV || import.meta.env?.MODE || 'development',
};

export const logger = pino({
  base: baseMetadata,
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
  ...(isProduction
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      }),
});
