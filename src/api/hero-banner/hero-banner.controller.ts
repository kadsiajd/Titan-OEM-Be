import { FastifyReply, FastifyRequest } from 'fastify';

import heroBannerDao from './hero-banner.dao';

import { sendSuccess } from '../../shared/utils/response';

class HeroBannerController {
  async getHeroBannerSlides(_request: FastifyRequest, reply: FastifyReply) {
    const slides = await heroBannerDao.getSlides();

    return sendSuccess(reply, {
      message: 'Hero banner slides fetched successfully',
      data: slides,
    });
  }
}

export default new HeroBannerController();
