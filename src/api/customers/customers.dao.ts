import prisma from '../../shared/db/prisma';

export const getAllCustomers = async () => {
  return prisma.customer.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      file: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
