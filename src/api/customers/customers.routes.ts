import { API_METHODS } from '../../config/api-methods';
import { IRouteOptions } from '../../shared/types/route.interface';

import * as customerController from './customers.controller';
import { getCustomersSchema } from './customers.schema';

const customerRoutes: IRouteOptions[] = [
  {
    url: '/customers',
    handler: customerController.getCustomers,
    schema: getCustomersSchema,
    method: API_METHODS.GET,
  },
];

export default customerRoutes;
