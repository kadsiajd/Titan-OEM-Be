import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';

const getProductsByCategoryMock = vi.hoisted(() => vi.fn());
const getAllProductsMock = vi.hoisted(() => vi.fn());

vi.mock('../../../src/api/products/products.dao', () => ({
  default: {
    getProductsByCategory: getProductsByCategoryMock,
    getAllProducts: getAllProductsMock,
  },
}));

import ProductsController from '../../../src/api/products/products.controller';

function createMockReply() {
  const reply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };

  return reply as unknown as FastifyReply;
}

describe('ProductsController.getProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

    await ProductsController.getProducts(
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
      ProductsController.getProducts(
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

describe('ProductsController.getAllProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns all products without filters', async () => {
    const products = [
      {
        id: 'product-1',
        name: '6130',
      },
    ];

    getAllProductsMock.mockResolvedValue(products);

    const reply = createMockReply();

    await ProductsController.getAllProducts(
      {
        query: {},
      } as FastifyRequest,
      reply,
    );

    expect(getAllProductsMock).toHaveBeenCalledWith(undefined, undefined);

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

  it('gets all products using categoryId and trimmed search', async () => {
    const products = [
      {
        id: 'product-1',
        name: '6130',
      },
    ];

    getAllProductsMock.mockResolvedValue(products);

    const reply = createMockReply();

    await ProductsController.getAllProducts(
      {
        query: {
          categoryId: 'category-1',
          search: '  6130  ',
        },
      } as FastifyRequest,
      reply,
    );

    expect(getAllProductsMock).toHaveBeenCalledWith('category-1', '6130');

    expect(reply.status).toHaveBeenCalledWith(200);

    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Products fetched successfully',
        data: products,
      }),
    );
  });

  it('passes undefined search when search contains only whitespace', async () => {
    getAllProductsMock.mockResolvedValue([]);

    const reply = createMockReply();

    await ProductsController.getAllProducts(
      {
        query: {
          categoryId: 'category-1',
          search: '   ',
        },
      } as FastifyRequest,
      reply,
    );

    expect(getAllProductsMock).toHaveBeenCalledWith('category-1', '');
  });

  it('propagates a dao failure instead of swallowing it', async () => {
    getAllProductsMock.mockRejectedValue(new Error('database unavailable'));

    const reply = createMockReply();

    await expect(
      ProductsController.getAllProducts(
        {
          query: {
            categoryId: 'category-1',
            search: '6130',
          },
        } as FastifyRequest,
        reply,
      ),
    ).rejects.toThrow('database unavailable');
  });
});
