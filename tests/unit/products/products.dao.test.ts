import { describe, it, expect, vi, beforeEach } from 'vitest';

const findManyMock = vi.hoisted(() => vi.fn());

vi.mock('@prisma/client', () => ({
  PrismaClient: class {
    product = { findMany: findManyMock };
  },
  ProductStatus: {
    PUBLISHED: 'PUBLISHED',
  },
}));

import { getProductsByCategory } from '../../../src/api/products/products.dao';

describe('getProductsByCategory', () => {
  beforeEach(() => {
    findManyMock.mockReset();
  });

  it('queries published, non-deleted products for the category with ordered specifications', async () => {
    findManyMock.mockResolvedValue([]);

    const categoryId = 'category-1';

    await getProductsByCategory(categoryId);

    expect(findManyMock).toHaveBeenCalledWith({
      where: {
        category: {
          id: {
            equals: categoryId,
          },
        },
        status: 'PUBLISHED',
        deletedAt: null,
      },

      include: {
        category: true,

        specifications: {
          where: {
            specification: {
              deletedAt: null,
            },
          },

          include: {
            specification: true,
          },

          orderBy: {
            specification: {
              displayOrder: 'asc',
            },
          },
        },
      },

      orderBy: {
        name: 'asc',
      },
    });
  });

  it('maps category details and specifications into the public product response', async () => {
    const createdAt = new Date('2026-07-24T08:00:00.000Z');
    const updatedAt = new Date('2026-07-24T09:00:00.000Z');

    findManyMock.mockResolvedValue([
      {
        id: 'product-1',
        name: '6130',
        status: 'PUBLISHED',
        categoryId: 'category-1',

        category: {
          id: 'category-1',
          name: 'Quartz',
          description: null,
        },

        specifications: [
          {
            specification: {
              fieldKey: 'battery',
            },
            value: 'SR621SW',
          },
          {
            specification: {
              fieldKey: 'thickness',
            },
            value: '2.60 mm',
          },
        ],

        createdAt,
        updatedAt,
      },
    ]);

    await expect(getProductsByCategory('category-1')).resolves.toEqual([
      {
        id: 'product-1',
        name: '6130',
        status: 'PUBLISHED',
        categoryId: 'category-1',

        category: {
          id: 'category-1',
          name: 'Quartz',
          description: null,
        },

        specifications: {
          battery: 'SR621SW',
          thickness: '2.60 mm',
        },

        createdAt,
        updatedAt,
      },
    ]);
  });
});
