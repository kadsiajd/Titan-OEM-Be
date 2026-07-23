import { FastifyReply, FastifyRequest } from 'fastify';

import { getProductsByCategory } from './products.dao';

import { ProductQuery } from './products.interface';

export const getProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { category } = request.query as ProductQuery;

    if (!category) {
      return reply.status(400).send({
        success: false,
        message: 'Category is required',
      });
    }

    const products = await getProductsByCategory(category);

    return reply.status(200).send({
      success: true,
      data: products,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch products',
    });
  }
};
