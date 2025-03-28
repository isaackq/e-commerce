import { ProjectRequestDto } from '../dtos/request/project.request.dto';
import { ProjectResponseDto } from '../dtos/response/project.response.dto';
import { ProjectTransformer } from '../transformer/project.transformer';
import { ProjectRepositoryInterface } from '@domain/ports/project.repository.interface';
import { User } from '@domain/entities/user/User';
import { Inject, Injectable } from '@nestjs/common';
import { Manager } from '@domain/entities/user/Manager';

@Injectable()
export class CreateProjectUsecase {
  constructor(
    private readonly projectTransformer: ProjectTransformer,
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepositoryInterface,
  ) {}

  async execute(projectRequestDto: ProjectRequestDto, currentUser: User): Promise<ProjectResponseDto> {
    const project = await this.projectTransformer.toEntity(projectRequestDto);
    project.createdBy = currentUser as Manager;

    return ProjectResponseDto.createFromEntity(await this.projectRepository.save(project));
  }
}
