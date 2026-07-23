import { describe, it, expect, vi } from 'vitest';
import { FastifyReply } from 'fastify';
import { sendSuccess } from '../../../src/shared/utils/response';

function createMockReply() {
  const reply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };
  return reply as unknown as FastifyReply;
}

describe('sendSuccess', () => {
  it('defaults to a 200 status and includes a timestamp in meta', () => {
    const reply = createMockReply();

    sendSuccess(reply, { message: 'OK', data: { id: '1' } });

    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'OK',
        data: { id: '1' },
        meta: expect.objectContaining({
          timestamp: expect.any(String),
        }),
      }),
    );
  });

  it('uses a custom status code when provided', () => {
    const reply = createMockReply();

    sendSuccess(reply, { message: 'Created', data: { id: '1' }, statusCode: 201 });

    expect(reply.status).toHaveBeenCalledWith(201);
  });

  it('omits pagination from meta when none is provided', () => {
    const reply = createMockReply();

    sendSuccess(reply, { message: 'OK', data: [] });

    const [response] = (reply.send as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(response.meta.pagination).toBeUndefined();
  });

  it('includes computed pagination details in meta when pagination is provided', () => {
    const reply = createMockReply();

    sendSuccess(reply, {
      message: 'OK',
      data: [],
      pagination: { page: 2, limit: 10, total: 25 },
    });

    const [response] = (reply.send as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(response.meta.pagination).toEqual({
      page: 2,
      limit: 10,
      total: 25,
      totalPages: 3,
    });
  });

  it('does not divide by zero when limit is zero', () => {
    const reply = createMockReply();

    sendSuccess(reply, {
      message: 'OK',
      data: [],
      pagination: { page: 1, limit: 0, total: 0 },
    });

    const [response] = (reply.send as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(response.meta.pagination.totalPages).toBe(0);
  });
});
