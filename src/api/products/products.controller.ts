import { FastifyReply, FastifyRequest } from 'fastify';

import { getProductsByCategory } from './products.dao';

import { ProductQuery } from './products.interface';
import { sendSuccess } from '../../shared/utils/response';

export const getProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  const { categoryId } = request.query as ProductQuery;
  const products = await getProductsByCategory(categoryId);

  return sendSuccess(reply, {
    message: 'Products fetched successfully',
    data: products,
  });
};
