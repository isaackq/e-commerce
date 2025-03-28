import { ProjectDocument } from '@infrastructure/schemas/project.schema';
import { Project } from '@domain/entities/Project';
import { UserMapper } from './user.mapper';
import { PositionMapper } from './position.mapper';
import { Manager } from '@domain/entities/user/Manager';

export class ProjectMapper {
  static map(projectDocument: ProjectDocument | string): Project {
    const project = new Project();
    if (typeof projectDocument === 'string') {
      project.id = projectDocument;

      return project;
    }

    project.id = projectDocument.id;
    project.title = projectDocument.title;
    project.positions = projectDocument.positions.map((positionDocument) =>
      PositionMapper.map(positionDocument as any),
    );
    project.createdBy = UserMapper.map(projectDocument.createdBy.toString()) as Manager;

    return project;
  }
}
