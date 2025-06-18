import { RolesEnum } from '../../enums/role.enum';
import { Birthday } from '../../ObjectValues/Birthday';

export abstract class User {
  public id?: string;
  public firstName: string;
  public lastname: string;
  public email: string;
  public password: string;
  public birthday: Birthday;
  public country: string;
  public isActive: boolean;

  abstract getRole(): RolesEnum;
}
