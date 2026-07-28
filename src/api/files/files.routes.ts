import { IRouteOptions } from '../../shared/types/route.interface';
import { getFile } from './files.controller';

const filesRoutes: IRouteOptions[] = [
  {
    url: '/files/:id',
    method: 'GET',
    handler: getFile,
  },
];

export default filesRoutes;
