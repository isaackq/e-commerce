import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@application/user/dtos/response/user.response.dto';
import { Position } from '@domain/entities/Position';
import { Project } from '@domain/entities/Project';
import { User } from '@domain/entities/User';

export class ProjectResponseDto {
  @ApiProperty({ example: '123e4567e89b', description: 'Unique identifier of the project' })
  id: string;

  @ApiProperty({ example: 'Project Alpha', description: 'Title of the project' })
  title: string;

  @ApiProperty({ type: () => UserResponseDto, description: 'User who created the project' })
  createdBy: UserResponseDto;

  @ApiProperty({ example: 'document.pdf', description: 'Document associated with the project' })
  document: string;

  @ApiProperty({
    example: '2025-01-01T00:00:00.000Z',
    description: 'Start date of the project',
    type: String,
    format: 'date-time',
  })
  startedAt: Date;

  @ApiProperty({
    example: '2025-12-31T23:59:59.999Z',
    description: 'End date of the project',
    type: String,
    format: 'date-time',
  })
  endedAt: Date;

  @ApiProperty({ type: [Position], description: 'List of positions ids related to the project' })
  positions: Position[];

  public static createFromEntity(project: Project): ProjectResponseDto {
    const projectResponseDto = new ProjectResponseDto();
    projectResponseDto.id = project.id;
    projectResponseDto.title = project.title;
    if (project.createdBy instanceof User) {
      projectResponseDto.createdBy = UserResponseDto.createFromEntity(project.createdBy);
    }
    projectResponseDto.document = project.document;
    projectResponseDto.startedAt = project.startedAt;
    projectResponseDto.endedAt = project.endedAt;
    projectResponseDto.positions = project.positions;

    return projectResponseDto;
  }
}
