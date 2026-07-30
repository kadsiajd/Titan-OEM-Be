import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../src/shared/db/prisma', () => ({
  default: {
    customer: {
      findMany: vi.fn(),
    },
  },
}));

import prisma from '../../../src/shared/db/prisma';
import { customerDao } from '../../../src/api/customers/customers.dao';

describe('CustomerDao.getAllCustomers', () => {
  const findManyMock = vi.mocked(prisma.customer.findMany);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('queries non-deleted customers including their file, newest first', async () => {
    findManyMock.mockResolvedValue([]);

    await customerDao.getAllCustomers();

    expect(findManyMock).toHaveBeenCalledWith({
      where: { deletedAt: null },
      include: { file: true },
      orderBy: { createdAt: 'desc' },
    });
  });

  it('returns the raw rows from prisma unchanged', async () => {
    const rows = [
      {
        id: 'cust-1',
        name: 'Acme Corp',
        file: {
          id: 'file-1',
        },
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-01'),
      },
    ];

    findManyMock.mockResolvedValue(rows as never);

    const result = await customerDao.getAllCustomers();

    expect(result).toEqual(rows);
  });

  it('returns an empty array when no customers are found', async () => {
    findManyMock.mockResolvedValue([]);

    const result = await customerDao.getAllCustomers();

    expect(result).toEqual([]);
  });

  it('propagates a prisma error', async () => {
    findManyMock.mockRejectedValue(new Error('database unavailable'));

    await expect(customerDao.getAllCustomers()).rejects.toThrow('database unavailable');
  });
});
