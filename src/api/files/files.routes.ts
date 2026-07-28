import { API_METHODS } from '../../config/api-methods';
import { IRouteOptions } from '../../shared/types/route.interface';
import { getFile } from './files.controller';

const filesRoutes: IRouteOptions[] = [
  {
    url: '/files/:id',
    method: API_METHODS.GET,
    handler: getFile,
  },
];

export default filesRoutes;
