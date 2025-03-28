import { Project } from './Project';
import { Employee } from './user/Employee';

export class Rating {
  id?: string;
  project: Project;
  employee: Employee;
  value: number;
  createdAt?: Date;
}
