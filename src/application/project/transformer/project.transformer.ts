import { Project } from '@domain/entities/Project';
import { ProjectRequestDto } from '../dtos/request/project.request.dto';
import { BadRequestException } from '@nestjs/common';
import { PositionRepositoryInterface } from '@domain/ports/position.repository.interface';

export class ProjectTransformer {
  constructor(private readonly positionRepository: PositionRepositoryInterface) {}

  async toEntity(projectRequestDto: ProjectRequestDto): Promise<Project> {
    const project = new Project();
    project.title = projectRequestDto.title;
    project.document = projectRequestDto.document;
    project.startedAt = projectRequestDto.startedAt;
    project.endedAt = projectRequestDto.endedAt;
    if (projectRequestDto.positionsIds.length > 0) {
      const positions = await this.positionRepository.findByIds(projectRequestDto.positionsIds);
      if (positions.length !== projectRequestDto.positionsIds.length) {
        throw new BadRequestException('One or many positions ids not found');
      }
      project.positions = positions;
    }

    return project;
  }
}
