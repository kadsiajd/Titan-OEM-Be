import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';

const createMock = vi.hoisted(() => vi.fn());

vi.mock('../../../src/api/enquiries/enquiries.dao', () => ({
  default: {
    create: createMock,
  },
}));

import EnquiryController from '../../../src/api/enquiries/enquiries.controller';

function createMockReply() {
  const reply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };

  return reply as unknown as FastifyReply;
}

function createMockRequest(body: unknown) {
  return { body } as FastifyRequest;
}

describe('EnquiryController.create', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates the enquiry and responds with a 201 success envelope', async () => {
    const created = {
      id: 'enq-1',
      name: 'Jane Doe',
      company: 'Acme Corp',
      email: 'jane@acme.com',
      phone: null,
      message: null,
      createdAt: new Date('2026-01-01'),
    };

    createMock.mockResolvedValue(created);

    const reply = createMockReply();

    await EnquiryController.create(
      createMockRequest({
        name: 'Jane Doe',
        company: 'Acme Corp',
        email: 'jane@acme.com',
      }),
      reply,
    );

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Jane Doe',
        company: 'Acme Corp',
        email: 'jane@acme.com',
      }),
    );

    expect(reply.status).toHaveBeenCalledWith(201);

    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Enquiry submitted successfully',
        data: created,
      }),
    );
  });

  it('throws a ValidationError when the body is invalid without calling the dao', async () => {
    const reply = createMockReply();

    const request = createMockRequest({
      company: 'Acme Corp',
      email: 'not-an-email',
    });

    await expect(EnquiryController.create(request, reply)).rejects.toMatchObject({
      code: 'VALIDATION_ERROR',
      statusCode: 400,
    });

    expect(createMock).not.toHaveBeenCalled();
  });

  it('rejects a name containing digits', async () => {
    const reply = createMockReply();

    const request = createMockRequest({
      name: 'Jane123',
      company: 'Acme Corp',
      email: 'jane@acme.com',
    });

    await expect(EnquiryController.create(request, reply)).rejects.toMatchObject({
      code: 'VALIDATION_ERROR',
      statusCode: 400,
      details: expect.arrayContaining([
        expect.objectContaining({
          field: 'name',
          message: 'Name must contain only letters',
        }),
      ]),
    });

    expect(createMock).not.toHaveBeenCalled();
  });

  it('propagates a dao failure instead of swallowing it', async () => {
    createMock.mockRejectedValue(new Error('database unavailable'));

    const reply = createMockReply();

    await expect(
      EnquiryController.create(
        createMockRequest({
          name: 'Jane Doe',
          company: 'Acme Corp',
          email: 'jane@acme.com',
        }),
        reply,
      ),
    ).rejects.toThrow('database unavailable');

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(reply.status).not.toHaveBeenCalled();
    expect(reply.send).not.toHaveBeenCalled();
  });
});
