import { ProductFileType, ProductStatus } from '@prisma/client';

import { buildFileUrl } from '../../shared/utils/local-storage';
import prisma from '../../shared/db/prisma';

class ProductsDao {
  async getProductsByCategory(categoryId: string) {
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

        documents: {
          where: {
            deletedAt: null,
          },

          include: {
            file: true,
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
        imageUrl: buildFileUrl(product.category.filePathId),
      },

      images: product.images.map((image) => ({
        id: image.id,
        filePathId: image.filePathId,
        filePath: buildFileUrl(image.filePathId),
        imageUrl: buildFileUrl(image.filePathId),
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

      documents: product.documents.map((document) => ({
        id: document.id,
        fileId: document.fileId,
        fileType: document.fileType,
        fileName: document.file.fileName,
        fileUrl: buildFileUrl(document.fileId),
      })),

      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
  }

  async getAllProducts(categoryId?: string, search?: string) {
    const products = await prisma.product.findMany({
      where: {
        ...(categoryId ? { categoryId } : {}),
        status: ProductStatus.PUBLISHED,
        deletedAt: null,

        ...(search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  description: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
      },

      include: {
        category: true,

        images: {
          where: {
            deletedAt: null,
            displayOrder: 1,
          },

          include: {
            file: true,
          },

          take: 1,
        },

        documents: {
          where: {
            deletedAt: null,
            fileType: {
              in: [ProductFileType.SPEC_SHEET, ProductFileType.TECHNICAL_DRAWING],
            },
          },

          include: {
            file: true,
          },
        },
      },

      orderBy: {
        name: 'asc',
      },
    });

    return products.map((product) => {
      const image = product.images[0];

      const specSheet = product.documents.find(
        (document) => document.fileType === ProductFileType.SPEC_SHEET,
      );

      const technicalDrawing = product.documents.find(
        (document) => document.fileType === ProductFileType.TECHNICAL_DRAWING,
      );

      const mapDocument = (document: (typeof product.documents)[number] | undefined) =>
        document
          ? {
              id: document.id,
              fileName: document.file.fileName,
              fileUrl: buildFileUrl(document.fileId),
            }
          : null;

      return {
        id: product.id,
        name: product.name,
        description: product.description,

        category: {
          id: product.category.id,
          name: product.category.name,
          imageUrl: buildFileUrl(product.category.filePathId),
        },

        image: image
          ? {
              id: image.id,
              fileName: image.file.fileName,
              imageUrl: buildFileUrl(image.filePathId),
              displayOrder: image.displayOrder,
            }
          : null,

        specSheet: mapDocument(specSheet),
        technicalDrawing: mapDocument(technicalDrawing),
      };
    });
  }
}

export default new ProductsDao();
