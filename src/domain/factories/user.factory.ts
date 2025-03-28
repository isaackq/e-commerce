import { Employee } from '@domain/entities/user/Employee';
import { Manager } from '@domain/entities/user/Manager';
import { Owner } from '@domain/entities/user/Owner';
import { User } from '@domain/entities/user/User';
import { RolesEnum } from '@domain/enums/roles.enum';

export default class UserFactory {
  static create(role: RolesEnum): User {
    switch (role) {
      case RolesEnum.EMPLOYEE:
        return new Employee();
      case RolesEnum.MANAGER:
        return new Manager();
      case RolesEnum.OWNER:
        return new Owner();
    }
  }
}
