import { IRouteOptions } from '../../shared/types/route.interface';
import CategoryController from './categories.controller';
import { getCategoriesSchema } from './categories.schema';

const controller = new CategoryController();

const categoryRoutes: IRouteOptions[] = [
  {
    url: '/categories',
    method: 'GET',
    handler: controller.getAllCategories,
    schema: getCategoriesSchema,
  },
];

export default categoryRoutes;
