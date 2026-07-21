import { Prisma } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import { mapPrismaError } from '../../../src/shared/errors/prisma-error';

function createPrismaError(code: string) {
  return new Prisma.PrismaClientKnownRequestError('Database operation failed', {
    code,
    clientVersion: Prisma.prismaVersion.client,
  });
}

describe('mapPrismaError', () => {
  it('maps unique constraint errors to conflict errors', () => {
    const error = mapPrismaError(createPrismaError('P2002'));

    expect(error?.statusCode).toBe(409);
    expect(error?.code).toBe('UNIQUE_CONSTRAINT_VIOLATION');
  });

  it('maps missing record errors to not found errors', () => {
    const error = mapPrismaError(createPrismaError('P2025'));

    expect(error?.statusCode).toBe(404);
    expect(error?.code).toBe('RESOURCE_NOT_FOUND');
  });

  it('returns null for unknown Prisma errors', () => {
    expect(mapPrismaError(createPrismaError('P9999'))).toBeNull();
  });

  it('returns null for non-Prisma errors', () => {
    expect(mapPrismaError(new Error('Unexpected error'))).toBeNull();
  });
});
