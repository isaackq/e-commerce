import { CreatedByInterface } from './CretaedByInterface';
import { Position } from './Position';
import { User } from './User';

export class Project implements CreatedByInterface {
  id?: string;
  title: string;
  createdBy: User;
  document: string;
  startedAt: Date;
  endedAt: Date;
  positions: Position[];

  getCreatedBy(): User {
    return this.createdBy;
  }
  setCreatedBy(user: User): void {
    this.createdBy = user;
  }
}
