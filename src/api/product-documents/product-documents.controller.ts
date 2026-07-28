import { FastifyReply, FastifyRequest } from 'fastify';
import { findById } from './product-documents.dao';
import { NotFoundError } from '../../shared/errors/AppError';
import { resolveFile, streamFile } from '../../shared/utils/local-storage';

export const downloadDocument = async (request: FastifyRequest, reply: FastifyReply) => {
  const { documentId } = request.params as { documentId: string };

  const document = await findById(documentId);

  if (!document) {
    throw new NotFoundError('Document not found');
  }

  const file = resolveFile(document.file.filePath);

  return streamFile(request, reply, file, {
    downloadFileName: document.file.fileName,
  });
};
