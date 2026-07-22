import { IRouteOptions } from '../../shared/types/route.interface';

import * as customerController from './customers.controller';
import { getCustomersSchema } from './customers.schema';

const customerRoutes: IRouteOptions[] = [
      {
    url: '/customers',
    handler: customerController.getCustomers,
    schema: getCustomersSchema,
    method: 'GET',
  },
];

export default customerRoutes;
