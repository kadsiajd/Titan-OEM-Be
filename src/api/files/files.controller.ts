import { FastifyReply, FastifyRequest } from 'fastify';
import { findById } from './files.dao';
import { NotFoundError } from '../../shared/errors/AppError';
import { resolveFile, streamFile } from '../../shared/utils/local-storage';

export const getFile = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  const fileRecord = await findById(id);

  if (!fileRecord) {
    throw new NotFoundError('File not found');
  }

  const file = resolveFile(fileRecord.filePath);

  return streamFile(request, reply, file);
};
