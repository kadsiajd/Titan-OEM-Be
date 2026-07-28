import { API_METHODS } from '../../config/api-methods';
import { IRouteOptions } from '../../shared/types/route.interface';

import * as productsController from './products.controller';

import { getAllProductsSchema, getProductsSchema } from './products.schema';

const productsRoutes: IRouteOptions[] = [
  {
    url: '/products',
    handler: productsController.getProducts,
    schema: getProductsSchema,
    method: API_METHODS.GET,
  },
  {
    url: '/products/all',
    handler: productsController.getAllProducts,
    schema: getAllProductsSchema,
    method: API_METHODS.GET,
  },
];

export default productsRoutes;
