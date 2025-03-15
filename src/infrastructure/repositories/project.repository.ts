import { Project } from '@domain/entities/Project';
import { ProjectRepositoryInterface } from '@domain/ports/project.repository.interface';
import { RegisterRepository } from '@infrastructure/decorators/register-repository.decorator';
import { ProjectMapper } from '@infrastructure/mappers/project.mapper';
import { ProjectDocument, Project as ProjectSchema } from '@infrastructure/schemas/project.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@RegisterRepository('Project')
@Injectable()
export class ProjectRepository implements ProjectRepositoryInterface {
  constructor(
    @InjectModel(ProjectSchema.name)
    private projectModel: Model<ProjectDocument>,
  ) {}

  async save(project: Project): Promise<Project> {
    const projectDocument = await this.projectModel.create({
      ...project,
      createdBy: project.createdBy.id,
      positions: project.positions?.map((position) => position.id),
    });

    return ProjectMapper.map(await projectDocument.populate('positions createdBy'));
  }

  async findOne(id: string): Promise<Project | null> {
    const projectDocument = await this.projectModel.findById(id).exec();

    if (!projectDocument) {
      return null;
    }

    return ProjectMapper.map(projectDocument);
  }
}
