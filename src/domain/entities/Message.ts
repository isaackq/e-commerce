import { User } from './User';
import { CreatedByInterface } from './CretaedByInterface';

export class Message implements CreatedByInterface {
  public id?: string;
  public title: string;
  public content: string;
  public sentBy?: User;
  public sentAt?: Date;

  getCreatedBy(): User {
    return this.sentBy;
  }
  setCreatedBy(user: User): void {
    this.sentBy = user;
  }
}
