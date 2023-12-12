import { Pagination } from "../Models/Pagination"

export interface PaginationResult<T> {
    Data: T;
    pagination: Pagination;
  }