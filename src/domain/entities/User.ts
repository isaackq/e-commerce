import { RolesEnum } from '@domain/enums/roles.enum';
import { Birthday } from '@domain/objectsValues/Birthday';

export class User {
  public id?: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public password: string;
  public birthday: Birthday;
  public mobileNumber: string;
  public role: RolesEnum;
}
