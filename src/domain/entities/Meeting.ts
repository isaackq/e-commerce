import { Project } from './Project';
import { User } from './User';

export class Meeting {
  public id?: string;
  public link: string;
  public project: Project;
  public members: User[];
  public startDate: Date;
  public endDate: Date;
  public description: string;
}
