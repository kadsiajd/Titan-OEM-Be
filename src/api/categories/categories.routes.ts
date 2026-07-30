import { API_METHODS } from '../../config/api-methods';
import { IRouteOptions } from '../../shared/types/route.interface';
import { getCategoriesSchema } from './categories.schema';
import categoryController from './categories.controller';
const categoryRoutes: IRouteOptions[] = [
  {
    url: '/categories',
    method: API_METHODS.GET,
    handler: categoryController.getAllCategories,
    schema: getCategoriesSchema,
  },
];

export default categoryRoutes;
