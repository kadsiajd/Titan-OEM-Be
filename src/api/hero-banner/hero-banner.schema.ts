import { buildListRouteSchema } from '../../shared/schemas/common.schema';

const heroBannerSlideItemSchema = {
  type: 'object',

  properties: {
    id: {
      type: 'string',
    },

    title: {
      type: 'string',
    },

    description: {
      type: ['string', 'null'],
    },

    imageUrl: {
      type: 'string',
    },
  },

  required: ['id', 'title', 'description', 'imageUrl'],
};

export const getHeroBannerSlidesSchema = buildListRouteSchema(heroBannerSlideItemSchema);
