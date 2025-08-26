import type { pagination } from '../models/pagination.entity';

export interface IResponse<T> {
  data: T[];
  pagination: pagination;
}

