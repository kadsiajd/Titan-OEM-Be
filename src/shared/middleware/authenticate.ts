import { FastifyRequest } from 'fastify';
import { UnauthorizedError } from '../errors/AppError';

export async function authenticate(request: FastifyRequest) {
  try {
    await request.jwtVerify();
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }
}
