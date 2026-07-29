import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NotFoundError } from '../../../src/shared/errors/AppError';

const findByIdMock = vi.hoisted(() => vi.fn());
const resolveFileMock = vi.hoisted(() => vi.fn());
const streamFileMock = vi.hoisted(() => vi.fn());

vi.mock('../../../src/api/files/files.dao', () => ({
  findById: findByIdMock,
}));

vi.mock('../../../src/shared/utils/local-storage', () => ({
  resolveFile: resolveFileMock,
  streamFile: streamFileMock,
}));

import { getFile } from '../../../src/api/files/files.controller';

function createMockRequest(id = 'file-1') {
  return {
    params: { id },
    headers: {},
  } as unknown as FastifyRequest;
}

function createMockReply() {
  const reply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
    header: vi.fn().mockReturnThis(),
    type: vi.fn().mockReturnThis(),
  };
  return reply as unknown as FastifyReply;
}

describe('getFile', () => {
  beforeEach(() => {
    findByIdMock.mockReset();
    resolveFileMock.mockReset();
    streamFileMock.mockReset();
  });

  it('throws NotFoundError when the file record does not exist', async () => {
    findByIdMock.mockResolvedValue(null);

    await expect(getFile(createMockRequest(), createMockReply())).rejects.toBeInstanceOf(
      NotFoundError,
    );

    expect(resolveFileMock).not.toHaveBeenCalled();
    expect(streamFileMock).not.toHaveBeenCalled();
  });

  it('resolves and streams an existing non-download file', async () => {
    const fileRecord = {
      id: 'file-1',
      fileName: 'image.png',
      filePath: 'products/image.png',
    };
    const resolvedFile = {
      absolutePath: '/uploads/products/image.png',
      size: 100,
      mimeType: 'image/png',
    };
    const request = createMockRequest('file-1');
    const reply = createMockReply();

    findByIdMock.mockResolvedValue(fileRecord);
    resolveFileMock.mockReturnValue(resolvedFile);
    streamFileMock.mockReturnValue(reply);

    await getFile(request, reply);

    expect(findByIdMock).toHaveBeenCalledWith('file-1');
    expect(resolveFileMock).toHaveBeenCalledWith('products/image.png');
    expect(streamFileMock).toHaveBeenCalledWith(request, reply, resolvedFile, {
      downloadFileName: undefined,
    });
  });

  it('sets a download file name when streaming a PDF', async () => {
    const fileRecord = {
      id: 'file-1',
      fileName: 'drawing.pdf',
      filePath: 'documents/drawing.pdf',
    };
    const resolvedFile = {
      absolutePath: '/uploads/documents/drawing.pdf',
      size: 100,
      mimeType: 'application/pdf',
    };
    const request = createMockRequest('file-1');
    const reply = createMockReply();

    findByIdMock.mockResolvedValue(fileRecord);
    resolveFileMock.mockReturnValue(resolvedFile);
    streamFileMock.mockReturnValue(reply);

    await getFile(request, reply);

    expect(streamFileMock).toHaveBeenCalledWith(request, reply, resolvedFile, {
      downloadFileName: 'drawing.pdf',
    });
  });
});
