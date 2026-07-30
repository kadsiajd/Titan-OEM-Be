import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../src/shared/db/prisma', () => ({
  default: {
    category: {
      findMany: vi.fn(),
    },
  },
}));

vi.mock('../../../src/shared/utils/fileStreams', () => ({
  buildFileUrl: vi.fn(),
}));

import prisma from '../../../src/shared/db/prisma';
import { buildFileUrl } from '../../../src/shared/utils/fileStreams';
import CategoryDao from '../../../src/api/categories/categories.dao';

describe('CategoryDao.findAll', () => {
  const findManyMock = vi.mocked(prisma.category.findMany);
  const buildFileUrlMock = vi.mocked(buildFileUrl);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('queries categories including their file and orders them by name', async () => {
    findManyMock.mockResolvedValue([]);

    await CategoryDao.findAll();

    expect(findManyMock).toHaveBeenCalledWith({
      include: { file: true },
      orderBy: { name: 'asc' },
    });
  });

  it('returns an empty array when no categories are found', async () => {
    findManyMock.mockResolvedValue([]);

    const result = await CategoryDao.findAll();

    expect(result).toEqual([]);
  });

  it('maps category data and builds the image URL from the file id', async () => {
    findManyMock.mockResolvedValue([
      {
        id: 'cat-1',
        name: 'Motors',
        shortDescription: 'Precision motors',
        briefDescription: 'High-quality precision motors for OEM applications',
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-02'),
        file: {
          id: 'file-1',
        },
      },
    ] as never);

    buildFileUrlMock.mockReturnValue('/uploads/motors.jpg');

    const result = await CategoryDao.findAll();

    expect(buildFileUrlMock).toHaveBeenCalledWith('file-1');

    expect(result).toEqual([
      {
        id: 'cat-1',
        name: 'Motors',
        shortDescription: 'Precision motors',
        briefDescription: 'High-quality precision motors for OEM applications',
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-02'),
        imageUrl: '/uploads/motors.jpg',
      },
    ]);
  });

  it('handles undefined briefDescription', async () => {
    findManyMock.mockResolvedValue([
      {
        id: 'cat-1',
        name: 'Motors',
        shortDescription: 'Precision motors',
        briefDescription: undefined,
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-02'),
        file: {
          id: 'file-1',
        },
      },
    ] as never);

    buildFileUrlMock.mockReturnValue('/uploads/motors.jpg');

    const result = await CategoryDao.findAll();

    expect(result).toEqual([
      {
        id: 'cat-1',
        name: 'Motors',
        shortDescription: 'Precision motors',
        briefDescription: undefined,
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-02'),
        imageUrl: '/uploads/motors.jpg',
      },
    ]);
  });
});
