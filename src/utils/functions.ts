import { FormatResponse } from './responses';

export function getSkip(take: number, page: number): number {
  return (page - 1) * take;
}

export function formatResponse<T>(
  data: T[] | T,
  page?: number,
  take?: number,
  total?: number,
): FormatResponse<T> {
  let info = {};
  if (page && take && total) {
    const lastPage = Math.ceil(total / take);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    info = {
      total,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
    };
  }

  return {
    info,
    data,
  };
}
