import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginatorRequestDto {
  @ApiProperty({
    description: 'Current page number (default: 1)',
    example: 1,
    minimum: 1,
    type: Number,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  public page: number = 1;

  @ApiProperty({
    description: 'Number of items per page (default: 25, max: 1000)',
    example: 25,
    minimum: 1,
    maximum: 1000,
    type: Number,
  })
  @IsInt()
  @Min(1)
  @Max(1000)
  @Type(() => Number)
  public limit: number = 25;
}
