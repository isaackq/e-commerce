import { CreatedByInterface } from './CretaedByInterface';
import { Project } from './Project';
import { Manager } from './user/Manager';
import { Owner } from './user/Owner';
import { User } from './user/User';

export class Meeting implements CreatedByInterface {
  public id?: string;
  public link: string;
  public project: Project;
  public createdBy: Manager | Owner;
  public participants: User[];
  public startDate: Date;
  public duration: number;
  public description?: string;

  getCreatedBy(): User {
    return this.createdBy;
  }
  setCreatedBy(user: User): void {
    this.createdBy = user;
  }
}
