import { IRouteOptions } from '../../shared/types/route.interface';
import { API_METHODS } from '../../config/api-methods';
import CategoryController from './categories.controller';
import { getCategoriesSchema } from './categories.schema';

const controller = new CategoryController();

const categoryRoutes: IRouteOptions[] = [
  {
    url: '/categories',
    method: API_METHODS.GET,
    handler: controller.getAll,
    schema: getCategoriesSchema,
  },
];

export default categoryRoutes;
