import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';

vi.mock('../../../src/api/customers/customers.dao', () => ({
  getAllCustomers: vi.fn(),
}));

import { getAllCustomers } from '../../../src/api/customers/customers.dao';
import { getCustomers } from '../../../src/api/customers/customers.controller';

function createMockReply() {
  const reply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };
  return reply as unknown as FastifyReply;
}

describe('getCustomers', () => {
  const findAllMock = vi.mocked(getAllCustomers);

  beforeEach(() => {
    findAllMock.mockReset();
  });

  it('maps each customer to the response shape and sends it via the success envelope', async () => {
    findAllMock.mockResolvedValue([
      {
        id: 'cust-1',
        name: 'Acme Corp',
        file: { filePath: '/logos/acme.png' },
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-02'),
      },
    ] as never);

    const reply = createMockReply();
    await getCustomers({} as FastifyRequest, reply);

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
            createdAt: new Date('2026-01-01'),
            updatedAt: new Date('2026-01-02'),
          },
        ],
      }),
    );
  });

  it('falls back to a null logoUrl when the customer has no file', async () => {
    findAllMock.mockResolvedValue([
      {
        id: 'cust-2',
        name: 'No Logo Inc',
        file: null,
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-01'),
      },
    ] as never);

    const reply = createMockReply();
    await getCustomers({} as FastifyRequest, reply);

    const [response] = (reply.send as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(response.data[0].logoUrl).toBeNull();
  });

  it('propagates a dao failure instead of swallowing it', async () => {
    findAllMock.mockRejectedValue(new Error('database unavailable'));

    const reply = createMockReply();

    await expect(getCustomers({} as FastifyRequest, reply)).rejects.toThrow(
      'database unavailable',
    );
  });
});
