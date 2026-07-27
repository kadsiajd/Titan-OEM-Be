import { PrismaClient, ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const getProductsByCategory = async (
  categoryId: string,
) => {
  const products = await prisma.product.findMany({
    where: {
      categoryId,
      status: ProductStatus.PUBLISHED,
      deletedAt: null,
    },

    include: {
      category: true,

      images: {
        where: {
          deletedAt: null,
        },

        include: {
          file: true,
        },

        orderBy: {
          displayOrder: 'asc',
        },
      },

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
    description: product.description,

    category: {
      id: product.category.id,
      name: product.category.name,
      shortDescription: product.category.shortDescription,
      briefDescription: product.category.briefDescription,
    },

    images: product.images.map((image) => ({
      id: image.id,
      filePathId: image.filePathId,
      filePath: image.file.filePath,
      fileName: image.file.fileName,
      displayOrder: image.displayOrder,
    })),

    specifications: product.specifications.map((item) => ({
      fieldKey: item.specification.fieldKey,
      fieldName: item.specification.fieldName,
      value: item.value,
      displayInCard: item.specification.isVisibleInOverview,
      displayOrder: item.specification.displayOrder,
    })),

    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }));
};