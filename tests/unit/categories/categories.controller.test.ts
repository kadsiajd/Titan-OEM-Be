import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';

const findAllMock = vi.hoisted(() => vi.fn());

vi.mock('../../../src/api/categories/categories.dao', () => ({
  default: {
    findAll: findAllMock,
  },
}));

import CategoryController from '../../../src/api/categories/categories.controller';

function createMockReply() {
  const reply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };

  return reply as unknown as FastifyReply;
}

describe('CategoryController.getAllCategories', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('responds with the categories from the dao wrapped in the success envelope', async () => {
    const categories = [
      {
        id: 'cat-1',
        name: 'Motors',
        shortDescription: 'Precision motors',
        briefDescription: 'High-quality precision motors',
        imageUrl: '/motors.jpg',
      },
    ];

    findAllMock.mockResolvedValue(categories);

    const request = {} as FastifyRequest;
    const reply = createMockReply();

    await CategoryController.getAllCategories(request, reply);

    expect(findAllMock).toHaveBeenCalledTimes(1);

    expect(reply.status).toHaveBeenCalledWith(200);

    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Categories fetched successfully',
        data: categories,
      }),
    );
  });

  it('propagates a dao failure instead of swallowing it', async () => {
    findAllMock.mockRejectedValue(new Error('database unavailable'));

    const request = {} as FastifyRequest;
    const reply = createMockReply();

    await expect(CategoryController.getAllCategories(request, reply)).rejects.toThrow(
      'database unavailable',
    );

    expect(findAllMock).toHaveBeenCalledTimes(1);
  });
});
