import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../src/shared/db/prisma', () => ({
  default: {
    customer: {
      findMany: vi.fn(),
    },
  },
}));

import prisma from '../../../src/shared/db/prisma';
import { getAllCustomers } from '../../../src/api/customers/customers.dao';

describe('getAllCustomers', () => {
  const findManyMock = vi.mocked(prisma.customer.findMany);

  beforeEach(() => {
    findManyMock.mockReset();
  });

  it('queries non-deleted customers including their file, newest first', async () => {
    findManyMock.mockResolvedValue([]);

    await getAllCustomers();

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
        file: { filePath: '/logos/acme.png' },
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-01'),
      },
    ];
    findManyMock.mockResolvedValue(rows as never);

    const result = await getAllCustomers();

    expect(result).toEqual(rows);
  });
});
