import prisma from '../../shared/db/prisma';
import { buildFileUrl } from '../../shared/utils/fileStreams';
import { MAX_HERO_BANNER_IMAGES } from '../../config/constants';
import { HeroBannerSlide } from './hero-banner.interface';

class HeroBannerDao {
  async getSlides(): Promise<HeroBannerSlide[]> {
    const slides = await prisma.heroBannerSlide.findMany({
      where: {
        deletedAt: null,
      },

      include: {
        file: true,
      },

      orderBy: {
        createdAt: 'asc',
      },

      take: MAX_HERO_BANNER_IMAGES,
    });

    return slides.map((slide) => ({
      id: slide.id,
      title: slide.title,
      description: slide.description,
      imageUrl: buildFileUrl(slide.fileId),
    }));
  }
}

export default new HeroBannerDao();
