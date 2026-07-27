import { IRouteOptions } from '../../shared/types/route.interface';
import EnquiryController from './enquiries.controller';
import { createEnquiryResponseSchema } from './enquiries.schema';

const controller = new EnquiryController();

const enquiryRoutes: IRouteOptions[] = [
  {
    url: '/enquiries',
    method: 'POST',
    handler: controller.create,
    schema: createEnquiryResponseSchema,
  },
];

export default enquiryRoutes;
