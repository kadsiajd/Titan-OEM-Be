import { FastifyReply, FastifyRequest } from 'fastify';
import { findById } from './files.dao';
import { NotFoundError } from '../../shared/errors/AppError';
import { resolveFile, streamFile } from '../../shared/utils/fileStreams';

const DOWNLOAD_MIME_TYPES = new Set(['application/pdf']);

export const getFile = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  const fileRecord = await findById(id);

  if (!fileRecord) {
    throw new NotFoundError('File not found');
  }

  const file = resolveFile(fileRecord.filePath);

  const downloadFileName = DOWNLOAD_MIME_TYPES.has(file.mimeType) ? fileRecord.fileName : undefined;

  return streamFile(request, reply, file, { downloadFileName });
};
