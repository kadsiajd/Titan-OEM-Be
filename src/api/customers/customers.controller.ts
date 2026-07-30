import { FastifyReply, FastifyRequest } from 'fastify';
import { customerDao } from './customers.dao';
import { CustomerResponse } from './customers.interface';
import { sendSuccess } from '../../shared/utils/response';
import { buildFileUrl } from '../../shared/utils/fileStreams';

export class CustomerController {
  async getCustomers(_request: FastifyRequest, reply: FastifyReply) {
    const customers = await customerDao.getAllCustomers();
    const data: CustomerResponse[] = customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      logoUrl: customer.file ? buildFileUrl(customer.file.id) : null,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }));
    return sendSuccess(reply, { message: 'Customers fetched successfully', data });
  }
}
export const customerController = new CustomerController();
