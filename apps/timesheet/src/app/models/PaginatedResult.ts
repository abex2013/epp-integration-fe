
export interface PaginatedResult<T> {
     data: T;
    pagination: Pagination;
  }
  export interface  Pagination {
    totalRecord:number;
    pageIndex:number ;
    pageSize:number;
    totalPage:number;
  }