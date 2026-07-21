import {
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  preHandlerHookHandler,
  RouteGenericInterface,
} from 'fastify';
import { ApiMethod } from '../../config/api-methods';

export interface IRouteOptions<T extends RouteGenericInterface = RouteGenericInterface> {
  url: string;
  method: ApiMethod;
  schema?: FastifySchema;
  preHandler?: preHandlerHookHandler[];
  handler: (request: FastifyRequest<T>, reply: FastifyReply) => Promise<unknown>;
  config?: Record<string, unknown>;
}

export type RouteList<T extends RouteGenericInterface = RouteGenericInterface> = IRouteOptions<T>[];
