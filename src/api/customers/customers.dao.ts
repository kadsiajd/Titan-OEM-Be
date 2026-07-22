import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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