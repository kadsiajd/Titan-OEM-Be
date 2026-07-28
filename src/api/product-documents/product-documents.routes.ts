import { IRouteOptions } from '../../shared/types/route.interface';
import { downloadDocument } from './product-documents.controller';

const productDocumentsRoutes: IRouteOptions[] = [
  {
    url: '/product-documents/:documentId/download',
    method: 'GET',
    handler: downloadDocument,
  },
];

export default productDocumentsRoutes;
