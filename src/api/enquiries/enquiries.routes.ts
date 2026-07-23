import { IRouteOptions } from '../../shared/types/route.interface';
import { API_METHODS } from '../../config/api-methods';
import EnquiryController from './enquiries.controller';
import { createEnquiryResponseSchema } from './enquiries.schema';

const controller = new EnquiryController();

const enquiryRoutes: IRouteOptions[] = [
  {
    url: '/enquiries',
    method: API_METHODS.POST,
    handler: controller.create,
    schema: createEnquiryResponseSchema,
  },
];

export default enquiryRoutes;
