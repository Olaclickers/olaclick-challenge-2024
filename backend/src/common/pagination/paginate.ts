import { Pagination } from './pagination.interface';

export function paginate<T>(
  data: T[],
  totalItems: number,
  page: number,
  limit: number
): Pagination<T> {
  const pageCount = Math.ceil(totalItems / limit);

  return {
    data,
    meta: {
      page,
      limit,
      itemCount: data.length,
      pageCount,
      hasPreviousPage: page > 1,
      hasNextPage: page < pageCount,
    },
  };
}
