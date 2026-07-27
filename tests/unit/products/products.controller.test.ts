import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';

const getProductsByCategoryMock = vi.hoisted(() => vi.fn());

vi.mock('../../../src/api/products/products.dao', () => ({
  getProductsByCategory: getProductsByCategoryMock,
}));

import { getProducts } from '../../../src/api/products/products.controller';

function createMockReply() {
  const reply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };

  return reply as unknown as FastifyReply;
}

describe('getProducts', () => {
  beforeEach(() => {
    getProductsByCategoryMock.mockReset();
  });

  it('returns products for the requested category in the success envelope', async () => {
    const products = [
      {
        id: 'product-1',
        name: '6130',
      },
    ];

    const categoryId = 'category-1';

    getProductsByCategoryMock.mockResolvedValue(products);

    const reply = createMockReply();

    await getProducts(
      {
        query: {
          categoryId,
        },
      } as FastifyRequest,
      reply,
    );

    expect(getProductsByCategoryMock).toHaveBeenCalledWith(categoryId);

    expect(reply.status).toHaveBeenCalledWith(200);

    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Products fetched successfully',
        data: products,
        meta: expect.objectContaining({
          timestamp: expect.any(String),
        }),
      }),
    );
  });

  it('propagates a dao failure instead of swallowing it', async () => {
    const categoryId = 'category-1';

    getProductsByCategoryMock.mockRejectedValue(new Error('database unavailable'));

    const reply = createMockReply();

    await expect(
      getProducts(
        {
          query: {
            categoryId,
          },
        } as FastifyRequest,
        reply,
      ),
    ).rejects.toThrow('database unavailable');
  });
});
