import { CreatedByInterface } from './CretaedByInterface';
import { Position } from './Position';
import { Manager } from './user/Manager';
import { User } from './user/User';

export class Project implements CreatedByInterface {
  id?: string;
  title: string;
  createdBy: Manager;
  document: string;
  startedAt: Date;
  endedAt: Date;
  positions: Position[];

  getCreatedBy(): User {
    return this.createdBy;
  }
  setCreatedBy(user: Manager): void {
    this.createdBy = user;
  }
}
