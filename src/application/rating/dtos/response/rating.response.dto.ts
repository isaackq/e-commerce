import { Rating } from '@domain/entities/Rating';
import { ApiProperty } from '@nestjs/swagger';

export class RatingResponseDto {
  @ApiProperty({
    description: 'The ID of the project being rated',
    type: String,
    example: '65c1b7f5d4f1a4567890abcd',
  })
  public readonly projectId: string;

  @ApiProperty({
    description: 'The ID of the employee receiving the rating',
    type: String,
    example: '65c1b8f5d4f1a4567890efgh',
  })
  public readonly employeeId: string;

  @ApiProperty({
    description: 'The rating value, typically between 1 and 5',
    type: Number,
    example: 4,
  })
  public readonly value: number;

  constructor(projectId: string, employeeId: string, value: number) {
    this.projectId = projectId;
    this.employeeId = employeeId;
    this.value = value;
  }

  public static createFromEntity(rating: Rating): RatingResponseDto {
    return new RatingResponseDto(rating.project.id, rating.employee.id, rating.value);
  }
}
