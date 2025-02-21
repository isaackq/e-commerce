import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class MeetingRequestDto {
  @ApiProperty({
    example: 'https://meeting.com',
    description: 'The link for the meeting',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  public link: string;

  @ApiProperty({
    example: '679767b26104d6ee49c2f6e4',
    description: 'The ID of the project that the meeting will discuss',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsMongoId()
  public projectId: string;

  @ApiProperty({
    example: ['679767b26104d6ee49c2f6e4', '5e8c9e67a7b6fc001dd7383a'],
    description: 'List of user IDs invited to the meeting (at least 2 users required)',
    required: true,
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(2)
  @IsMongoId({ each: true })
  public participantsIds: string[];

  @ApiProperty({
    example: '2025-03-04T09:00:00.000Z',
    description: 'Scheduled start date and time of the meeting',
    required: true,
    type: Date,
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  public startDate: Date;

  @ApiProperty({
    example: 60,
    description: 'Duration of the meeting in minutes (minimum 5 minutes)',
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(5)
  public duration: number;

  @ApiProperty({
    example: 'Discuss the architecture of the software',
    description: 'This is to let the guests know the topic of the meeting',
    type: String,
  })
  @IsString()
  @IsOptional()
  public description?: string;

  constructor(
    link: string,
    projectId: string,
    participantsIds: string[],
    startDate: Date,
    duration: number,
    description?: string,
  ) {
    this.link = link;
    this.projectId = projectId;
    this.participantsIds = participantsIds;
    this.startDate = startDate;
    this.duration = duration;
    this.description = description;
  }
}
