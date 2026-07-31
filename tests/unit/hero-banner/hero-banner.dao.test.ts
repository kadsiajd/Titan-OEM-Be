import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../src/shared/db/prisma', () => ({
  default: {
    heroBannerSlide: {
      findMany: vi.fn(),
    },
  },
}));

vi.mock('../../../src/shared/utils/fileStreams', () => ({
  buildFileUrl: vi.fn(),
}));

import prisma from '../../../src/shared/db/prisma';
import { buildFileUrl } from '../../../src/shared/utils/fileStreams';
import { MAX_HERO_BANNER_IMAGES } from '../../../src/config/constants';
import HeroBannerDao from '../../../src/api/hero-banner/hero-banner.dao';

describe('HeroBannerDao.getSlides', () => {
  const findManyMock = vi.mocked(prisma.heroBannerSlide.findMany);
  const buildFileUrlMock = vi.mocked(buildFileUrl);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('queries non-deleted slides including the file, capped at the max, ordered by upload time', async () => {
    findManyMock.mockResolvedValue([]);

    await HeroBannerDao.getSlides();

    expect(findManyMock).toHaveBeenCalledWith({
      where: { deletedAt: null },
      include: { file: true },
      orderBy: { createdAt: 'asc' },
      take: MAX_HERO_BANNER_IMAGES,
    });
  });

  it('returns an empty array when no slides are configured', async () => {
    findManyMock.mockResolvedValue([]);

    const result = await HeroBannerDao.getSlides();

    expect(result).toEqual([]);
  });

  it('maps each slide with its own title, description, and image url', async () => {
    findManyMock.mockResolvedValue([
      {
        id: 'hero-1',
        title: 'Precision in Every Detail',
        description: 'Engineering excellence and innovative solutions.',
        fileId: 'file-1',
      },
      {
        id: 'hero-2',
        title: 'Innovation That Moves Time',
        description: 'Advanced engineering solutions.',
        fileId: 'file-2',
      },
    ] as never);

    buildFileUrlMock.mockImplementation((fileId: string) => `/uploads/${fileId}.jpg`);

    const result = await HeroBannerDao.getSlides();

    expect(buildFileUrlMock).toHaveBeenCalledWith('file-1');
    expect(buildFileUrlMock).toHaveBeenCalledWith('file-2');

    expect(result).toEqual([
      {
        id: 'hero-1',
        title: 'Precision in Every Detail',
        description: 'Engineering excellence and innovative solutions.',
        imageUrl: '/uploads/file-1.jpg',
      },
      {
        id: 'hero-2',
        title: 'Innovation That Moves Time',
        description: 'Advanced engineering solutions.',
        imageUrl: '/uploads/file-2.jpg',
      },
    ]);
  });

  it('handles a null description on a slide', async () => {
    findManyMock.mockResolvedValue([
      {
        id: 'hero-1',
        title: 'Precision in Every Detail',
        description: null,
        fileId: 'file-1',
      },
    ] as never);

    buildFileUrlMock.mockReturnValue('/uploads/file-1.jpg');

    const result = await HeroBannerDao.getSlides();

    expect(result).toEqual([
      {
        id: 'hero-1',
        title: 'Precision in Every Detail',
        description: null,
        imageUrl: '/uploads/file-1.jpg',
      },
    ]);
  });
});
