export interface Pagination<T> {
    data: T[];
    meta: {
      page: number;
      limit: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  }
  