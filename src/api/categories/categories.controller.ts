import { FastifyReply, FastifyRequest } from 'fastify';
import { sendSuccess } from '../../shared/utils/response';
import categoriesDao from './categories.dao';

class CategoryController {
  async getAllCategories(_request: FastifyRequest, reply: FastifyReply) {
    const categories = await categoriesDao.findAll();

    return sendSuccess(reply, {
      message: 'Categories fetched successfully',
      data: categories,
    });
  }
}

export default new CategoryController();
