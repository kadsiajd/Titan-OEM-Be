import { API_METHODS } from '../../config/api-methods';
import { IRouteOptions } from '../../shared/types/route.interface';

import heroBannerController from './hero-banner.controller';

import { getHeroBannerSlidesSchema } from './hero-banner.schema';

const heroBannerRoutes: IRouteOptions[] = [
  {
    url: '/hero-banner',
    handler: heroBannerController.getHeroBannerSlides,
    schema: getHeroBannerSlidesSchema,
    method: API_METHODS.GET,
  },
];

export default heroBannerRoutes;
