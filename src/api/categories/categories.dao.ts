import prisma from '../../shared/db/prisma';
import { Category } from './categories.interface';

class CategoryDao {
  async findAll(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      include: { file: true },
      orderBy: { name: 'asc' },
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      shortDescription: category.shortDescription,
      briefDescription: category?.briefDescription,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      imageUrl: category.file.filePath,
    }));
  }
}

export default CategoryDao;
