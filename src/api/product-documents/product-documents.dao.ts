import prisma from '../../shared/db/prisma';

export const findById = async (id: string) => {
  return prisma.productDocument.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    include: {
      file: true,
    },
  });
};
