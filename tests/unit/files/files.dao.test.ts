import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../src/shared/db/prisma', () => ({
  default: {
    file: {
      findFirst: vi.fn(),
    },
  },
}));

import prisma from '../../../src/shared/db/prisma';
import { findById } from '../../../src/api/files/files.dao';

describe('findById', () => {
  const findFirstMock = vi.mocked(prisma.file.findFirst);

  beforeEach(() => {
    findFirstMock.mockReset();
  });

  it('queries a non-deleted file by id', async () => {
    findFirstMock.mockResolvedValue(null);

    await findById('file-1');

    expect(findFirstMock).toHaveBeenCalledWith({
      where: {
        id: 'file-1',
        deletedAt: null,
      },
    });
  });

  it('returns the file row from prisma', async () => {
    const file = {
      id: 'file-1',
      fileName: 'drawing.pdf',
      filePath: 'documents/drawing.pdf',
    };
    findFirstMock.mockResolvedValue(file as never);

    await expect(findById('file-1')).resolves.toEqual(file);
  });
});
