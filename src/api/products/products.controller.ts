import { FastifyReply, FastifyRequest } from 'fastify';

import productsDao from './products.dao';
import { GetAllProductsQuery, ProductQuery } from './products.interface';

import { sendSuccess } from '../../shared/utils/response';

class ProductsController {
  async getProducts(request: FastifyRequest, reply: FastifyReply) {
    const { categoryId } = request.query as ProductQuery;

    const products = await productsDao.getProductsByCategory(categoryId);

    return sendSuccess(reply, {
      message: 'Products fetched successfully',
      data: products,
    });
  }

  async getAllProducts(request: FastifyRequest, reply: FastifyReply) {
    const { categoryId, search } = request.query as GetAllProductsQuery;

    const products = await productsDao.getAllProducts(categoryId, search?.trim());

    return sendSuccess(reply, {
      message: 'Products fetched successfully',
      data: products,
    });
  }
}

export default new ProductsController();
