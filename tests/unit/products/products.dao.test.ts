import { describe, it, expect, vi, beforeEach } from 'vitest';

const findManyMock = vi.hoisted(() => vi.fn());

vi.mock('../../../src/shared/db/prisma', () => ({
  default: {
    product: {
      findMany: findManyMock,
    },
  },
}));

vi.mock('../../../src/shared/utils/local-storage', () => ({
  buildFileUrl: (fileId: string) => `https://files.example.test/files/${fileId}`,
}));

import ProductsDao from '../../../src/api/products/products.dao';

describe('ProductsDao.getProductsByCategory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('queries published, non-deleted products with their files and specifications', async () => {
    findManyMock.mockResolvedValue([]);

    await ProductsDao.getProductsByCategory('category-1');

    expect(findManyMock).toHaveBeenCalledWith({
      where: {
        categoryId: 'category-1',
        status: 'PUBLISHED',
        deletedAt: null,
      },
      include: expect.objectContaining({
        category: true,
        images: expect.any(Object),
        documents: expect.any(Object),
        specifications: expect.any(Object),
      }),
      orderBy: {
        name: 'asc',
      },
    });
  });

  it('maps category, product image, specifications, and document URLs into the public response', async () => {
    const createdAt = new Date('2026-07-24T08:00:00.000Z');
    const updatedAt = new Date('2026-07-24T09:00:00.000Z');

    findManyMock.mockResolvedValue([
      {
        id: 'product-1',
        name: '6130',
        status: 'PUBLISHED',
        categoryId: 'category-1',
        description: 'A quartz movement',
        createdAt,
        updatedAt,
        category: {
          id: 'category-1',
          name: 'Quartz',
          shortDescription: 'Quartz movements',
          briefDescription: null,
          filePathId: 'category-file-1',
        },
        images: [
          {
            id: 'image-1',
            filePathId: 'product-file-1',
            displayOrder: 1,
            file: {
              fileName: 'quartz-6130.png',
            },
          },
        ],
        specifications: [
          {
            specification: {
              fieldKey: 'battery',
              fieldName: 'Battery',
              isVisibleInOverview: true,
              displayOrder: 1,
            },
            value: 'SR621SW',
          },
        ],
        documents: [
          {
            id: 'document-1',
            fileId: 'document-file-1',
            fileType: 'SPEC_SHEET',
            file: {
              fileName: 'spec-sheet-placeholder.pdf',
            },
          },
        ],
      },
    ]);

    const result = await ProductsDao.getProductsByCategory('category-1');

    expect(result).toEqual([
      {
        id: 'product-1',
        name: '6130',
        status: 'PUBLISHED',
        categoryId: 'category-1',
        description: 'A quartz movement',
        category: {
          id: 'category-1',
          name: 'Quartz',
          shortDescription: 'Quartz movements',
          briefDescription: null,
          imageUrl: 'https://files.example.test/files/category-file-1',
        },
        images: [
          {
            id: 'image-1',
            filePathId: 'product-file-1',
            filePath: 'https://files.example.test/files/product-file-1',
            imageUrl: 'https://files.example.test/files/product-file-1',
            fileName: 'quartz-6130.png',
            displayOrder: 1,
          },
        ],
        specifications: [
          {
            fieldKey: 'battery',
            fieldName: 'Battery',
            value: 'SR621SW',
            displayInCard: true,
            displayOrder: 1,
          },
        ],
        documents: [
          {
            id: 'document-1',
            fileId: 'document-file-1',
            fileType: 'SPEC_SHEET',
            fileName: 'spec-sheet-placeholder.pdf',
            fileUrl: 'https://files.example.test/files/document-file-1',
          },
        ],
        createdAt,
        updatedAt,
      },
    ]);
  });

  it('returns an empty array when no products are found', async () => {
    findManyMock.mockResolvedValue([]);

    const result = await ProductsDao.getProductsByCategory('category-1');

    expect(result).toEqual([]);
  });

  it('propagates a prisma error', async () => {
    findManyMock.mockRejectedValue(new Error('database unavailable'));

    await expect(ProductsDao.getProductsByCategory('category-1')).rejects.toThrow(
      'database unavailable',
    );
  });
});

describe('ProductsDao.getAllProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('queries all published and non-deleted products without filters', async () => {
    findManyMock.mockResolvedValue([]);

    await ProductsDao.getAllProducts();

    expect(findManyMock).toHaveBeenCalledWith({
      where: {
        status: 'PUBLISHED',
        deletedAt: null,
      },
      include: expect.objectContaining({
        category: true,
        images: expect.any(Object),
        documents: expect.any(Object),
      }),
      orderBy: {
        name: 'asc',
      },
    });
  });

  it('queries products using category and search filters', async () => {
    findManyMock.mockResolvedValue([]);

    await ProductsDao.getAllProducts('category-1', '613');

    expect(findManyMock).toHaveBeenCalledWith({
      where: {
        categoryId: 'category-1',
        status: 'PUBLISHED',
        deletedAt: null,
        OR: [
          {
            name: {
              contains: '613',
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: '613',
              mode: 'insensitive',
            },
          },
        ],
      },
      include: expect.objectContaining({
        category: true,
        images: expect.any(Object),
        documents: expect.any(Object),
      }),
      orderBy: {
        name: 'asc',
      },
    });
  });

  it('maps the primary image and both document types', async () => {
    findManyMock.mockResolvedValue([
      {
        id: 'product-1',
        name: '6130',
        description: 'A quartz movement',
        category: {
          id: 'category-1',
          name: 'Quartz',
          filePathId: 'category-file-1',
        },
        images: [
          {
            id: 'image-1',
            filePathId: 'product-file-1',
            displayOrder: 1,
            file: {
              fileName: 'quartz-6130.png',
            },
          },
        ],
        documents: [
          {
            id: 'spec-document-1',
            fileId: 'spec-file-1',
            fileType: 'SPEC_SHEET',
            file: {
              fileName: '6130-spec.pdf',
            },
          },
          {
            id: 'drawing-document-1',
            fileId: 'drawing-file-1',
            fileType: 'TECHNICAL_DRAWING',
            file: {
              fileName: '6130-drawing.pdf',
            },
          },
        ],
      },
    ]);

    const result = await ProductsDao.getAllProducts('category-1', '613');

    expect(result).toEqual([
      {
        id: 'product-1',
        name: '6130',
        description: 'A quartz movement',
        category: {
          id: 'category-1',
          name: 'Quartz',
          imageUrl: 'https://files.example.test/files/category-file-1',
        },
        image: {
          id: 'image-1',
          fileName: 'quartz-6130.png',
          imageUrl: 'https://files.example.test/files/product-file-1',
          displayOrder: 1,
        },
        specSheet: {
          id: 'spec-document-1',
          fileName: '6130-spec.pdf',
          fileUrl: 'https://files.example.test/files/spec-file-1',
        },
        technicalDrawing: {
          id: 'drawing-document-1',
          fileName: '6130-drawing.pdf',
          fileUrl: 'https://files.example.test/files/drawing-file-1',
        },
      },
    ]);
  });

  it('returns null for image and documents when they are not available', async () => {
    findManyMock.mockResolvedValue([
      {
        id: 'product-1',
        name: '6130',
        description: 'A quartz movement',
        category: {
          id: 'category-1',
          name: 'Quartz',
          filePathId: 'category-file-1',
        },
        images: [],
        documents: [],
      },
    ]);

    const result = await ProductsDao.getAllProducts();

    expect(result).toEqual([
      {
        id: 'product-1',
        name: '6130',
        description: 'A quartz movement',
        category: {
          id: 'category-1',
          name: 'Quartz',
          imageUrl: 'https://files.example.test/files/category-file-1',
        },
        image: null,
        specSheet: null,
        technicalDrawing: null,
      },
    ]);
  });

  it('propagates a prisma error', async () => {
    findManyMock.mockRejectedValue(new Error('database unavailable'));

    await expect(ProductsDao.getAllProducts()).rejects.toThrow('database unavailable');
  });
});
