import { Prisma } from '@prisma/client';
import { AppError, ConflictError, NotFoundError } from './AppError';

export function mapPrismaError(error: unknown): AppError | null {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return null;
  }

  switch (error.code) {
    case 'P2002':
      return new ConflictError(
        'A record with this value already exists',
        'UNIQUE_CONSTRAINT_VIOLATION',
      );
    case 'P2003':
      return new ConflictError(
        'Operation violates a related record constraint',
        'FOREIGN_KEY_CONSTRAINT_VIOLATION',
      );
    case 'P2025':
      return new NotFoundError('Requested resource was not found', 'RESOURCE_NOT_FOUND');
    default:
      return null;
  }
}
