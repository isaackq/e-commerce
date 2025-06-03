import { PaginatorRequestDto } from '@application/dtos/request/paginator.request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserQueryDto extends PaginatorRequestDto {
  @ApiProperty({
    example: 'Hazem',
    description: 'The name of employee',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
