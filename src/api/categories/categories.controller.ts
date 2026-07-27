import { FastifyReply, FastifyRequest } from 'fastify';
import CategoryDao from './categories.dao';
import { sendSuccess } from '../../shared/utils/response';

class CategoryController {
  private dao = new CategoryDao();

  getAllCategories = async (_request: FastifyRequest, reply: FastifyReply) => {
    const categories = await this.dao.findAll();

    return sendSuccess(reply, {
      message: 'Categories fetched successfully',
      data: categories,
    });
  };
}

export default CategoryController;
