export async function onRequestError(
  err: unknown,
  request: { path: string; method: string },
) {
  const { logger } = await import('./utils/server-logger');
  logger.error({ err, path: request.path, method: request.method }, 'Server Exception');
}
