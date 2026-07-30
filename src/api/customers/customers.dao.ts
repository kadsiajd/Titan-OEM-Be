import prisma from '../../shared/db/prisma';
export class CustomerDao {
  async getAllCustomers() {
    return prisma.customer.findMany({
      where: { deletedAt: null },
      include: { file: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
export const customerDao = new CustomerDao();
