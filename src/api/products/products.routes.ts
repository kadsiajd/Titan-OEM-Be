import { IRouteOptions } from '../../shared/types/route.interface';

import * as productsController from './products.controller';

import { getProductsSchema } from './products.schema';

const productsRoutes: IRouteOptions[] = [
  {
    url: '/products',
    handler: productsController.getProducts,
    schema: getProductsSchema,
    method: 'GET',
  },
];

export default productsRoutes;
