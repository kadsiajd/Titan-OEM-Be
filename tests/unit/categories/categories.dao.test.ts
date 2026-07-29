import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../src/shared/db/prisma', () => ({
  default: {
    category: {
      findMany: vi.fn(),
    },
  },
}));

vi.mock('../../../src/shared/utils/fileStreams', () => ({
  buildFileUrl: (fileId: string) => `https://files.example.test/files/${fileId}`,
}));

import prisma from '../../../src/shared/db/prisma';
import CategoryDao from '../../../src/api/categories/categories.dao';

describe('CategoryDao.findAll', () => {
  const findManyMock = vi.mocked(prisma.category.findMany);

  beforeEach(() => {
    findManyMock.mockReset();
  });

  it('queries categories including their file, ordered by name', async () => {
    findManyMock.mockResolvedValue([]);
    const dao = new CategoryDao();

    await dao.findAll();

    expect(findManyMock).toHaveBeenCalledWith({
      include: { file: true },
      orderBy: { name: 'asc' },
    });
  });

  it('maps the category fields and nested file id to imageUrl on each category', async () => {
    const createdAt = new Date('2026-01-01');
    const updatedAt = new Date('2026-01-02');

    findManyMock.mockResolvedValue([
      {
        id: 'cat-1',
        name: 'Motors',
        shortDescription: 'Precision motors',
        briefDescription: 'Movement components',
        createdAt,
        updatedAt,
        file: { id: 'category-file-1' },
      },
    ] as never);
    const dao = new CategoryDao();

    const result = await dao.findAll();

    expect(result).toEqual([
      {
        id: 'cat-1',
        name: 'Motors',
        shortDescription: 'Precision motors',
        briefDescription: 'Movement components',
        createdAt,
        updatedAt,
        imageUrl: 'https://files.example.test/files/category-file-1',
      },
    ]);
  });
});
