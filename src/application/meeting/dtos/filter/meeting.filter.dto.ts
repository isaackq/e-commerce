import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class MeetingFilterDto {
  @ApiProperty({
    example: '2025-02-21T00:00:00.000Z',
    description: 'The start date of the filter range (ISO 8601 format)',
    required: true,
    type: Date,
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  public startDate: Date;

  @ApiProperty({
    example: '2025-02-28T23:59:59.999Z',
    description: 'The end date of the filter range (ISO 8601 format)',
    required: true,
    type: Date,
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  public endDate: Date;
}
