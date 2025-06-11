import { User } from '@domain/entities/user/User';
import { Birthday } from '@domain/objectsValues/Birthday';
import UserFactory from '@domain/factories/user.factory';
import { Employee } from '@domain/entities/user/Employee';
import { PositionMapper } from './position.mapper';
import { Manager } from '@domain/entities/user/Manager';
import { UserDocument } from '@infrastructure/schemas/user.schema';

export class UserMapper {
  static map(userDocument: UserDocument | string): User {
    if (typeof userDocument === 'string') {
      const user = new Manager();
      user.id = userDocument;
      return user;
    }
    const user = UserFactory.create(userDocument.role);

    user.id = userDocument.id;
    user.password = userDocument.password;
    user.firstname = userDocument.firstname;
    user.lastname = userDocument.lastname;
    user.birthday = new Birthday(userDocument.birthday);
    user.mobileNumber = userDocument.mobileNumber;
    user.country = userDocument.country;
    user.city = userDocument.city;
    user.nationality = userDocument.nationality;
    user.email = userDocument.email;

    if (user instanceof Employee) {
      this.mapEmployee(userDocument, user);
    }

    if (user instanceof Manager) {
      this.mapManager(userDocument, user);
    }

    return user;
  }

  private static mapEmployee(userDocument: UserDocument, employee: Employee) {
    employee.employment = userDocument.employment;
    employee.employmentStatus = userDocument.employmentStatus;
    employee.contractStartDate = userDocument.contractStartDate;
    employee.salary = userDocument.salary;
    employee.experienceYears = userDocument.experienceYears;
    employee.experienceStatus = userDocument.experienceStatus;
    employee.contractEndDate = userDocument.contractEndDate;

    employee.position = PositionMapper.map(userDocument.position as any);
  }

  private static mapManager(userDocument: UserDocument, manager: Manager) {
    manager.employment = userDocument.employment;
    manager.employmentStatus = userDocument.employmentStatus;
    manager.contractStartDate = userDocument.contractStartDate;
    manager.salary = userDocument.salary;
    manager.experienceYears = userDocument.experienceYears;
    manager.experienceStatus = userDocument.experienceStatus;
    manager.contractEndDate = userDocument.contractEndDate;
  }
}
