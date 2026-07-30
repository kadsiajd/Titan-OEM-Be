import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';

const getAllCustomersMock = vi.hoisted(() => vi.fn());
const buildFileUrlMock = vi.hoisted(() => vi.fn());

vi.mock('../../../src/api/customers/customers.dao', () => ({
  customerDao: {
    getAllCustomers: getAllCustomersMock,
  },
}));

vi.mock('../../../src/shared/utils/fileStreams', () => ({
  buildFileUrl: buildFileUrlMock,
}));

import { customerController } from '../../../src/api/customers/customers.controller';

function createMockReply() {
  const reply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };

  return reply as unknown as FastifyReply;
}

describe('CustomerController.getCustomers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('maps customers and returns them in the success response', async () => {
    const createdAt = new Date('2026-01-01');
    const updatedAt = new Date('2026-01-02');

    getAllCustomersMock.mockResolvedValue([
      {
        id: 'cust-1',
        name: 'Acme Corp',
        file: {
          id: 'file-1',
        },
        createdAt,
        updatedAt,
      },
    ]);

    buildFileUrlMock.mockReturnValue('/logos/acme.png');

    const reply = createMockReply();

    await customerController.getCustomers({} as FastifyRequest, reply);

    expect(getAllCustomersMock).toHaveBeenCalledTimes(1);

    expect(buildFileUrlMock).toHaveBeenCalledWith('file-1');

    expect(reply.status).toHaveBeenCalledWith(200);

    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Customers fetched successfully',
        data: [
          {
            id: 'cust-1',
            name: 'Acme Corp',
            logoUrl: '/logos/acme.png',
            createdAt,
            updatedAt,
          },
        ],
      }),
    );
  });

  it('returns null logoUrl when the customer has no file', async () => {
    const createdAt = new Date('2026-01-01');
    const updatedAt = new Date('2026-01-02');

    getAllCustomersMock.mockResolvedValue([
      {
        id: 'cust-2',
        name: 'No Logo Inc',
        file: null,
        createdAt,
        updatedAt,
      },
    ]);

    const reply = createMockReply();

    await customerController.getCustomers({} as FastifyRequest, reply);

    expect(buildFileUrlMock).not.toHaveBeenCalled();

    const [response] = (reply.send as ReturnType<typeof vi.fn>).mock.calls[0];

    expect(response.data).toEqual([
      {
        id: 'cust-2',
        name: 'No Logo Inc',
        logoUrl: null,
        createdAt,
        updatedAt,
      },
    ]);
  });

  it('propagates a dao failure instead of swallowing it', async () => {
    getAllCustomersMock.mockRejectedValue(new Error('database unavailable'));

    const reply = createMockReply();

    await expect(customerController.getCustomers({} as FastifyRequest, reply)).rejects.toThrow(
      'database unavailable',
    );

    expect(reply.status).not.toHaveBeenCalled();
    expect(reply.send).not.toHaveBeenCalled();
  });
});
