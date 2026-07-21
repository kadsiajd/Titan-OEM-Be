import { describe, it, expect } from 'vitest';
import { AppError, NotFoundError, ValidationError } from '../../../src/shared/errors/AppError';

describe('AppError', () => {
  it('should create error with default values', () => {
    const error = new AppError('Something went wrong');

    expect(error.message).toBe('Something went wrong');
    expect(error.statusCode).toBe(500);
    expect(error.code).toBe('INTERNAL_ERROR');
  });

  it('should create error with custom status and code', () => {
    const error = new AppError('Not allowed', 403, 'FORBIDDEN');

    expect(error.statusCode).toBe(403);
    expect(error.code).toBe('FORBIDDEN');
  });
});

describe('NotFoundError', () => {
  it('should have 404 status code', () => {
    const error = new NotFoundError();

    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('NOT_FOUND');
  });
});

describe('ValidationError', () => {
  it('should include validation details', () => {
    const details = [{ field: 'email', message: 'Invalid email' }];
    const error = new ValidationError('Validation failed', details);

    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.details).toEqual(details);
  });
});
