import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ValidationError } from '../../../src/shared/errors/AppError';

const createMock = vi.hoisted(() => vi.fn());

vi.mock('../../../src/api/enquiries/enquiries.dao', () => ({
  default: vi.fn().mockImplementation(() => ({
    create: createMock,
  })),
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
    createMock.mockReset();
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

    const controller = new EnquiryController();
    const reply = createMockReply();

    await controller.create(
      createMockRequest({ name: 'Jane Doe', company: 'Acme Corp', email: 'jane@acme.com' }),
      reply,
    );

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Jane Doe', company: 'Acme Corp', email: 'jane@acme.com' }),
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

  it('throws a ValidationError with field-level details when the body is invalid, without calling the dao', async () => {
    const controller = new EnquiryController();
    const reply = createMockReply();

    const request = createMockRequest({ company: 'Acme Corp', email: 'not-an-email' });

    await expect(controller.create(request, reply)).rejects.toMatchObject({
      code: 'VALIDATION_ERROR',
      statusCode: 400,
    });

    expect(createMock).not.toHaveBeenCalled();
  });

  it('rejects a name containing digits', async () => {
    const controller = new EnquiryController();
    const reply = createMockReply();

    const request = createMockRequest({
      name: 'Jane123',
      company: 'Acme Corp',
      email: 'jane@acme.com',
    });

    let caught: ValidationError | undefined;
    try {
      await controller.create(request, reply);
    } catch (error) {
      caught = error as ValidationError;
    }

    expect(caught).toBeInstanceOf(ValidationError);
    expect(caught?.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'name', message: 'Name must contain only letters' }),
      ]),
    );
  });

  it('propagates a dao failure instead of swallowing it', async () => {
    createMock.mockRejectedValue(new Error('database unavailable'));

    const controller = new EnquiryController();
    const reply = createMockReply();

    await expect(
      controller.create(
        createMockRequest({ name: 'Jane Doe', company: 'Acme Corp', email: 'jane@acme.com' }),
        reply,
      ),
    ).rejects.toThrow('database unavailable');
  });
});
