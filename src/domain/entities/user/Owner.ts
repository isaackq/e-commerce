import { RolesEnum } from '@domain/enums/roles.enum';
import { User } from './User';

export class Owner extends User {
  getRole(): RolesEnum {
    return RolesEnum.OWNER;
  }
}
