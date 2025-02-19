import { Position } from './Position';
import { User } from './User';

export class Project {
  id?: string;
  title: string;
  createdBy: User;
  document: string;
  startedAt: Date;
  endedAt: Date;
  positions: Position[];
}
