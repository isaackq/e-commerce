import { User } from './User';

export class Message {
  public id?: string;
  public title: string;
  public content: string;
  public sentBy?: User;
  public sentAt?: Date;
}
