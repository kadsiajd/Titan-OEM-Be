import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';

const getSlidesMock = vi.hoisted(() => vi.fn());

vi.mock('../../../src/api/hero-banner/hero-banner.dao', () => ({
  default: {
    getSlides: getSlidesMock,
  },
}));

import HeroBannerController from '../../../src/api/hero-banner/hero-banner.controller';

function createMockReply() {
  const reply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };

  return reply as unknown as FastifyReply;
}

describe('HeroBannerController.getHeroBannerSlides', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('responds with the slides from the dao wrapped in the success envelope', async () => {
    const slides = [
      {
        id: 'hero-1',
        title: 'Precision in Every Detail',
        description: 'Engineering excellence and innovative solutions.',
        imageUrl: '/uploads/hero-1.jpg',
      },
    ];

    getSlidesMock.mockResolvedValue(slides);

    const request = {} as FastifyRequest;
    const reply = createMockReply();

    await HeroBannerController.getHeroBannerSlides(request, reply);

    expect(getSlidesMock).toHaveBeenCalledTimes(1);

    expect(reply.status).toHaveBeenCalledWith(200);

    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Hero banner slides fetched successfully',
        data: slides,
      }),
    );
  });

  it('propagates a dao failure instead of swallowing it', async () => {
    getSlidesMock.mockRejectedValue(new Error('database unavailable'));

    const request = {} as FastifyRequest;
    const reply = createMockReply();

    await expect(HeroBannerController.getHeroBannerSlides(request, reply)).rejects.toThrow(
      'database unavailable',
    );

    expect(getSlidesMock).toHaveBeenCalledTimes(1);
  });
});
