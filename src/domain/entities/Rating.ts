import { Project } from './Project';
import { User } from './User';

export class Rating {
  id?: string;
  project: Project;
  employee: User;
  value: number;
  createdAt?: Date;
}
