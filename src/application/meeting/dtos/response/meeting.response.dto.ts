import { ProjectResponseDto } from '@application/project/dtos/response/project.response.dto';
import { UserResponseDto } from '@application/user/dtos/response/user.response.dto';
import { Meeting } from '@domain/entities/Meeting';
import { ApiProperty } from '@nestjs/swagger';

export class MeetingResponseDto {
  @ApiProperty({
    example: 'https://meeting.com',
    description: 'The link for the meeting',
    required: true,
    type: String,
  })
  public link: string;

  @ApiProperty({
    description: 'The project which the meeting will discuss',
    required: true,
    type: ProjectResponseDto,
  })
  public project: ProjectResponseDto;

  @ApiProperty({
    description: 'The users invited to the meeting (at least one participant required)',
    required: true,
    type: [UserResponseDto],
  })
  public participants: UserResponseDto[];

  @ApiProperty({
    example: '2025-03-04T09:00:00.000Z',
    description: 'Scheduled start date and time of the meeting',
    required: true,
    type: Date,
  })
  public startDate: Date;

  @ApiProperty({
    example: 60,
    description: 'Duration of the meeting in minutes (minimum 5 minutes)',
    required: true,
    type: Number,
  })
  public duration: number;

  @ApiProperty({
    example: 'Discuss the architecture of the software',
    description: 'This is to let the guests know the topic of the meeting',
    type: String,
  })
  public description?: string;

  constructor(
    link: string,
    project: ProjectResponseDto,
    participants: UserResponseDto[],
    startDate: Date,
    duration: number,
    description: string | null,
  ) {
    this.link = link;
    this.project = project;
    this.participants = participants;
    this.startDate = startDate;
    this.duration = duration;
    this.description = description;
  }

  public static createFromEntity(meeting: Meeting): MeetingResponseDto {
    return new MeetingResponseDto(
      meeting.link,
      ProjectResponseDto.createFromEntity(meeting.project),
      meeting.participants.map((user) => UserResponseDto.createFromEntity(user)),
      meeting.startDate,
      meeting.duration,
      meeting.description,
    );
  }
}
