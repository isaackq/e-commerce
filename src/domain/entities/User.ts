import { Birthday } from '@domain/objectsValues/Birthday';

export class User {
  public id?: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public birthday: Birthday;
  public mobileNumber: string;
}
