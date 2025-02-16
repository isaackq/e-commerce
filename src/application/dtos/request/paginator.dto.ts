import { IsInt, Max } from 'class-validator';

export class PaginatorDto {
  @IsInt()
  public page: number = 1;
  @IsInt()
  @Max(1000)
  public limit: number = 25;
}
