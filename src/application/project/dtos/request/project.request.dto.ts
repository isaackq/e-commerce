import { Type } from 'class-transformer';
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectRequestDto {
  @ApiProperty({ description: 'The title of the project', example: 'AWS Migration' })
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({ description: 'Document URL', example: 'https://example.com/document.pdf' })
  @IsUrl()
  @IsNotEmpty()
  public document: string;

  @ApiProperty({ description: 'Project start date', example: '2025-01-15T00:00:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  public startedAt: Date;

  @ApiProperty({ description: 'Project end date', example: '2025-06-30T00:00:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  public endedAt: Date;

  @ApiProperty({
    description: 'List of position IDs',
    example: ['dev123', 'lead456'],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  public positionsIds?: string[] = null;

  constructor(title: string, document: string, startedAt: Date, endedAt: Date, positionsIds: string[]) {
    this.title = title;
    this.document = document;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.positionsIds = positionsIds;
  }
}
