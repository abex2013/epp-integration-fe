import { Pagination } from "./Pagination";

export interface PaginatedResult<T> {
    result: T;
    pagination: Pagination;
  }