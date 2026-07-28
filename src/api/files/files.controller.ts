import { FastifyReply, FastifyRequest } from 'fastify';
import { resolveFile, streamFile } from '../../shared/utils/local-storage';

export const getFile = async (request: FastifyRequest, reply: FastifyReply) => {
  const requestedPath = (request.params as { '*': string })['*'];
  const file = resolveFile(requestedPath);

  return streamFile(request, reply, file);
};
