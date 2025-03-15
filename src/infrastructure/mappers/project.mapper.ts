import { ProjectDocument } from '@infrastructure/schemas/project.schema';
import { Project } from '@domain/entities/Project';
import { UserMapper } from './user.mapper';
import { PositionMapper } from './position.mapper';

export class ProjectMapper {
  static map(projectDocument: ProjectDocument | string): Project {
    const project = new Project();
    if (typeof projectDocument === 'string') {
      project.id = projectDocument;

      return project;
    }

    project.id = projectDocument.id.toString();
    project.title = projectDocument.title;
    project.positions = projectDocument.positions.map((positionDocument) =>
      PositionMapper.map(positionDocument as any),
    );
    project.createdBy = UserMapper.map(projectDocument.createdBy as any);

    return project;
  }
}
