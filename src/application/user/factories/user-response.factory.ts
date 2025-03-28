import { User } from '@domain/entities/user/User';
import { RolesEnum } from '@domain/enums/roles.enum';
import { Employee } from '@domain/entities/user/Employee';
import { Manager } from '@domain/entities/user/Manager';
import { Owner } from '@domain/entities/user/Owner';
import { UserResponseDto } from '../dtos/response/user.response.dto';
import { EmployeeResponseDto } from '../dtos/response/employee.response.dto';
import { ManagerResponseDto } from '../dtos/response/manager.response.dto';
import { OwnerResponseDto } from '../dtos/response/owner.response.dto';

export class UserResponseFactory {
  static createFromEntity(user: User): UserResponseDto {
    let userResponse: UserResponseDto;
    if (user.getRole() === RolesEnum.EMPLOYEE) {
      userResponse = EmployeeResponseDto.createFromEntity(user as Employee);
    }
    if (user.getRole() === RolesEnum.MANAGER) {
      userResponse = ManagerResponseDto.createFromEntity(user as Manager);
    }
    if (user.getRole() === RolesEnum.OWNER) {
      userResponse = OwnerResponseDto.createFromEntity(user as Owner);
    }

    return userResponse;
  }
}
