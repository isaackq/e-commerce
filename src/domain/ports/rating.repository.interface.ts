import { Rating } from '@domain/entities/Rating';

export interface RatingRepositoryInterface {
  save(rating: Rating): Promise<void>;
  findByProjectId(projectId: string): Promise<Rating[]>;
  findByEmployeeId(employeeId: string): Promise<Rating[]>;
}
