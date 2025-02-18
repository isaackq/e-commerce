import { ProjectDocument } from '@infrastructure/schemas/project.schema';
import { Project } from '@domain/entities/Project';
import { UserMapper } from './user.mapper';

export class ProjectMapper {
  static map(projectDocument: ProjectDocument): Project {
    const project = new Project();
    project.id = projectDocument.id.toString();
    project.title = projectDocument.title;
    project.createdBy = UserMapper.map(projectDocument.createdBy as any);

    return project;
  }
}
