import { describe, it, expect } from 'vitest';
import { getPaginationParams } from '../../../src/shared/utils/pagination';

describe('getPaginationParams', () => {
  it('should return default pagination values', () => {
    const result = getPaginationParams({});

    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(result.skip).toBe(0);
  });

  it('should calculate skip correctly', () => {
    const result = getPaginationParams({ page: 3, limit: 20 });

    expect(result.page).toBe(3);
    expect(result.limit).toBe(20);
    expect(result.skip).toBe(40);
  });

  it('should enforce minimum page of 1', () => {
    const result = getPaginationParams({ page: 0, limit: 10 });

    expect(result.page).toBe(1);
    expect(result.skip).toBe(0);
  });

  it('should cap limit at 100', () => {
    const result = getPaginationParams({ page: 1, limit: 500 });

    expect(result.limit).toBe(100);
  });
});
