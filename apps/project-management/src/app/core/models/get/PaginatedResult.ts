import { Pagination } from "./Pagination";

export interface PaginatedResult<T> {
     data: T;
    pagination: Pagination;
  }