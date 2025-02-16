export class Paginator<T> {
  constructor(
    public page: number,
    public total: number,
    public limit: number,
    public data: Array<T>,
  ) {}
}
