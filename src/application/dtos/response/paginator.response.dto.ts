export class PaginatorResponseDto<T> {
  page: number;
  total: number;
  limit: number;
  data: T[];

  constructor(page: number, total: number, limit: number, data: Array<T>) {
    this.page = page;
    this.total = total;
    this.limit = limit;
    this.data = data;
  }
}
