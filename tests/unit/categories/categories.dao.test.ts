import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../src/shared/db/prisma', () => ({
  default: {
    category: {
      findMany: vi.fn(),
    },
  },
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

  it('maps the nested file.filePath to imageUrl on each category', async () => {
    findManyMock.mockResolvedValue([
      {
        id: 'cat-1',
        name: 'Motors',
        description: 'Precision motors',
        file: { filePath: '/uploads/motors.jpg' },
      },
    ] as never);
    const dao = new CategoryDao();

    const result = await dao.findAll();

    expect(result).toEqual([
      {
        id: 'cat-1',
        name: 'Motors',
        description: 'Precision motors',
        imageUrl: '/uploads/motors.jpg',
      },
    ]);
  });
});
