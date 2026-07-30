import { API_METHODS } from '../../config/api-methods';
import { IRouteOptions } from '../../shared/types/route.interface';
import enquiryController from './enquiries.controller';
import { createEnquiryResponseSchema } from './enquiries.schema';

const enquiryRoutes: IRouteOptions[] = [
  {
    url: '/enquiries',
    method: API_METHODS.POST,
    handler: enquiryController.create,
    schema: createEnquiryResponseSchema,
  },
];

export default enquiryRoutes;
