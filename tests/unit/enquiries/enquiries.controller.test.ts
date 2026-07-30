import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../src/shared/db/prisma', () => ({
  default: {
    enquiry: {
      create: vi.fn(),
    },
  },
}));

import prisma from '../../../src/shared/db/prisma';
import EnquiryDao from '../../../src/api/enquiries/enquiries.dao';

describe('EnquiryDao.create', () => {
  const createMock = vi.mocked(prisma.enquiry.create);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('passes only the expected fields through to prisma', async () => {
    createMock.mockResolvedValue({} as never);

    await EnquiryDao.create({
      name: 'Jane Doe',
      company: 'Acme Corp',
      email: 'jane@acme.com',
      phone: '1234567890',
      message: 'Interested in a quote',
    });

    expect(createMock).toHaveBeenCalledWith({
      data: {
        name: 'Jane Doe',
        company: 'Acme Corp',
        email: 'jane@acme.com',
        phone: '1234567890',
        message: 'Interested in a quote',
      },
    });
  });

  it('returns whatever prisma returns for the created record', async () => {
    const created = {
      id: 'enq-1',
      name: 'Jane Doe',
      company: 'Acme Corp',
      email: 'jane@acme.com',
      phone: null,
      message: null,
      createdAt: new Date('2026-01-01'),
    };

    createMock.mockResolvedValue(created as never);

    const result = await EnquiryDao.create({
      name: 'Jane Doe',
      company: 'Acme Corp',
      email: 'jane@acme.com',
    });

    expect(result).toEqual(created);
  });

  it('propagates a prisma error', async () => {
    createMock.mockRejectedValue(new Error('database unavailable'));

    await expect(
      EnquiryDao.create({
        name: 'Jane Doe',
        company: 'Acme Corp',
        email: 'jane@acme.com',
      }),
    ).rejects.toThrow('database unavailable');
  });
});
