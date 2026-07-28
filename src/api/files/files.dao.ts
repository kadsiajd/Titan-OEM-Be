import prisma from '../../shared/db/prisma';

export const findById = async (id: string) => {
  return prisma.file.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
};
