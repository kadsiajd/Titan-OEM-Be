import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';

const findAllMock = vi.hoisted(() => vi.fn());

vi.mock('../../../src/api/categories/categories.dao', () => ({
  default: vi.fn().mockImplementation(() => ({
    findAll: findAllMock,
  })),
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
    findAllMock.mockReset();
  });

  it('responds with the categories from the dao wrapped in the success envelope', async () => {
    const categories = [
      { id: 'cat-1', name: 'Motors', description: 'Precision motors', imageUrl: '/motors.jpg' },
    ];
    findAllMock.mockResolvedValue(categories);

    const controller = new CategoryController();
    const reply = createMockReply();

    await controller.getAllCategories({} as FastifyRequest, reply);

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

    const controller = new CategoryController();
    const reply = createMockReply();

    await expect(controller.getAllCategories({} as FastifyRequest, reply)).rejects.toThrow(
      'database unavailable',
    );
  });
});
