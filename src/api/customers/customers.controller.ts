import { FastifyReply, FastifyRequest } from 'fastify';
import { getAllCustomers } from './customers.dao';
import { CustomerResponse } from './customers.interface';

export const getCustomers = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const customers = await getAllCustomers();

    const data: CustomerResponse[] = customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      logoUrl: customer.file?.filePath ?? null,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }));

    return reply.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch customers',
    });
  }
};