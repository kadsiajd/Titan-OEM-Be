import { FastifyReply, FastifyRequest } from 'fastify';

import { getAllProducts as getAllProductsFromDao, getProductsByCategory } from './products.dao';

import { GetAllProductsQuery, ProductQuery } from './products.interface';
import { sendSuccess } from '../../shared/utils/response';

export const getProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  const { categoryId } = request.query as ProductQuery;
  const products = await getProductsByCategory(categoryId);

  return sendSuccess(reply, {
    message: 'Products fetched successfully',
    data: products,
  });
};

export const getAllProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  const { categoryId, search } = request.query as GetAllProductsQuery;
  const products = await getAllProductsFromDao(categoryId, search?.trim());

  return sendSuccess(reply, {
    message: 'Products fetched successfully',
    data: products,
  });
};
