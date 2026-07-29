import { FastifyReply, FastifyRequest } from 'fastify';
import { getAllCustomers } from './customers.dao';
import { CustomerResponse } from './customers.interface';
import { sendSuccess } from '../../shared/utils/response';
import { buildFileUrl } from '../../shared/utils/fileStreams';

export const getCustomers = async (_request: FastifyRequest, reply: FastifyReply) => {
  const customers = await getAllCustomers();

  const data: CustomerResponse[] = customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    logoUrl: customer.file ? buildFileUrl(customer.file.id) : null,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
  }));

  return sendSuccess(reply, {
    message: 'Customers fetched successfully',
    data,
  });
};
