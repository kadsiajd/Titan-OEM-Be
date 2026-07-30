import { API_METHODS } from '../../config/api-methods';
import { IRouteOptions } from '../../shared/types/route.interface';
import { customerController } from './customers.controller';
import { getCustomersSchema } from './customers.schema';
const customerRoutes: IRouteOptions[] = [
  {
    url: '/customers',
    method: API_METHODS.GET,
    handler: customerController.getCustomers,
    schema: getCustomersSchema,
  },
];

export default customerRoutes;
