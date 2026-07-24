import { PrismaClient, ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const getProductsByCategory = async (
  categoryId: string,
) => {
  const products = await prisma.product.findMany({
    where: {
      category: {
        id: {
          equals: categoryId,
        },
      },
      status: ProductStatus.PUBLISHED,
      deletedAt: null,
    },

    include: {
      category: true,

      specifications: {
        where: {
          specification: {
            deletedAt: null,
          },
        },

        include: {
          specification: true,
        },

        orderBy: {
          specification: {
            displayOrder: 'asc',
          },
        },
      },
    },

    orderBy: {
      name: 'asc',
    },
  });

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    status: product.status,
    categoryId: product.categoryId,

    category: {
      id: product.category.id,
      name: product.category.name,
      description: product.category.description,
    },

    specifications: Object.fromEntries(
      product.specifications.map((item) => [
        item.specification.fieldKey,
        item.value,
      ]),
    ),

    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }));
};