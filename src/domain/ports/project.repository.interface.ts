import { Project } from '@domain/entities/Project';
import { FindOneRepositoryInterface } from './find-one.repository.interface';

export interface ProjectRepositoryInterface extends FindOneRepositoryInterface {
  save(project: Project): Promise<Project>;
  findOne(id: string): Promise<Project | null>;
}
