import { Project } from '@domain/entities/Project';

export interface ProjectRepositoryInterface {
  findOne(id: string): Promise<Project | null>;
  save(project: Project): Promise<Project>;
}
