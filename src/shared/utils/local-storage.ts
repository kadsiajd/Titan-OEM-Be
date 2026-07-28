import fs from 'fs';
import path from 'path';
import { FastifyReply, FastifyRequest } from 'fastify';
import { env } from '../../config/env';
import { ForbiddenError, NotFoundError } from '../errors/AppError';

const UPLOAD_ROOT = path.resolve(process.cwd(), env.UPLOAD_ROOT);

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

const RANGE_PATTERN = /bytes=(\d*)-(\d*)/;

export interface ResolvedFile {
  absolutePath: string;
  size: number;
  mimeType: string;
}

/**
 * Turns a DB-stored relative path (e.g. "/categories/quartz.jpg") into a
 * real file on disk, guarding against traversal outside UPLOAD_ROOT.
 */
export function resolveFile(relativePath: string): ResolvedFile {
  const normalized = path
    .normalize(`/${relativePath}`)
    .replace(/^(\.\.[/\\])+/, '');

  const absolutePath = path.join(UPLOAD_ROOT, normalized);

  if (!absolutePath.startsWith(UPLOAD_ROOT)) {
    throw new ForbiddenError('Invalid file path');
  }

  if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
    throw new NotFoundError('File not found');
  }

  const stat = fs.statSync(absolutePath);
  const ext = path.extname(absolutePath).toLowerCase();

  return {
    absolutePath,
    size: stat.size,
    mimeType: MIME_TYPES[ext] ?? 'application/octet-stream',
  };
}

interface StreamFileOptions {
  /** When set, sends Content-Disposition: attachment with this filename. */
  downloadFileName?: string;
}

/**
 * Streams a resolved file to the client, honoring Range requests (206
 * Partial Content) so large files don't have to be buffered in memory.
 */
export function streamFile(
  request: FastifyRequest,
  reply: FastifyReply,
  file: ResolvedFile,
  options: StreamFileOptions = {},
) {
  reply.header('Accept-Ranges', 'bytes');
  reply.type(file.mimeType);

  if (options.downloadFileName) {
    reply.header('Content-Disposition', `attachment; filename="${options.downloadFileName}"`);
  }

  const range = request.headers.range;

  if (!range) {
    reply.header('Content-Length', file.size);
    return reply.send(fs.createReadStream(file.absolutePath));
  }

  const match = RANGE_PATTERN.exec(range);
  const start = match?.[1] ? parseInt(match[1], 10) : 0;
  const end = match?.[2] ? parseInt(match[2], 10) : file.size - 1;

  if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= file.size) {
    reply.status(416).header('Content-Range', `bytes */${file.size}`);
    return reply.send();
  }

  reply
    .status(206)
    .header('Content-Range', `bytes ${start}-${end}/${file.size}`)
    .header('Content-Length', end - start + 1);

  return reply.send(fs.createReadStream(file.absolutePath, { start, end }));
}
