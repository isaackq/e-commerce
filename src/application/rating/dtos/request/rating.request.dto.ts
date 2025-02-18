import { IsObjectId } from '@application/validation/is-object-id.validation';
import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RatingRequestDto {
  @ApiProperty({
    description: 'The ID of the project being rated',
    type: String,
    example: '65c1b7f5d4f1a4567890abcd',
  })
  @Validate(IsObjectId)
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    description: 'The ID of the employee receiving the rating',
    type: String,
    example: '65c1b8f5d4f1a4567890efgh',
  })
  @Validate(IsObjectId)
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({
    description: 'The rating value, typically between 1 and 5',
    type: Number,
    example: 4,
  })
  @IsNumber()
  @IsNotEmpty()
  value: number;
}
