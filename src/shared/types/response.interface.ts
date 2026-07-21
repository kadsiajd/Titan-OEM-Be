export interface ApiMeta {
  timestamp: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
  meta: ApiMeta;
}

export interface ErrorDetail {
  field?: string;
  message: string;
}

export interface ErrorBody {
  code: string;
  details?: ErrorDetail[];
}

export interface ErrorResponse {
  success: false;
  message: string;
  error: ErrorBody;
  meta: ApiMeta;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}
