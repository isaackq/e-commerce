import { Employee } from '@domain/entities/user/Employee';
import { User } from '@domain/entities/user/User';
import UserFactory from '@domain/factories/user.factory';
import { Birthday } from '@domain/objectsValues/Birthday';
import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRequestDto } from '../dtos/request/employee.request.dto';
import { ManagerRequestDto } from '../dtos/request/manager.request.dto';
import { OwnerRequestDto } from '../dtos/request/owner.request.dto';
import { PositionRepositoryInterface } from '@domain/ports/position.repository.interface';
import { Manager } from '@domain/entities/user/Manager';
import { RolesEnum } from '@domain/enums/roles.enum';
import { UpdateUserInfoDto } from '../dtos/request/update-user-info.dto';

@Injectable()
export class UserTransformer {
  constructor(@Inject('PositionRepository') private readonly positionRepository: PositionRepositoryInterface) {}

  async toEntity(userRequestDto: EmployeeRequestDto | ManagerRequestDto | OwnerRequestDto): Promise<User> {
    const role =
      userRequestDto instanceof EmployeeRequestDto
        ? RolesEnum.EMPLOYEE
        : userRequestDto instanceof ManagerRequestDto
          ? RolesEnum.MANAGER
          : RolesEnum.OWNER;
    const user = UserFactory.create(role);

    user.firstname = userRequestDto.firstname;
    user.lastname = userRequestDto.lastname;
    user.email = userRequestDto.email;
    user.password = userRequestDto.password;
    user.birthday = new Birthday(userRequestDto.birthday);
    user.mobileNumber = userRequestDto.mobileNumber;
    user.country = userRequestDto.country;
    user.city = userRequestDto.city;
    user.nationality = userRequestDto.nationality;

    if (user instanceof Employee && userRequestDto instanceof EmployeeRequestDto) {
      user.employment = userRequestDto.employment;
      user.employmentStatus = userRequestDto.employmentStatus;
      user.contractStartDate = userRequestDto.contractStartDate;
      user.salary = userRequestDto.salary;
      user.experienceYears = userRequestDto.experienceYears;
      user.experienceStatus = userRequestDto.experienceStatus;
      user.contractEndDate = userRequestDto.contractEndDate;

      user.position = await this.positionRepository.findOne(userRequestDto.positionId);
    }
    if (user instanceof Manager && userRequestDto instanceof ManagerRequestDto) {
      user.employment = userRequestDto.employment;
      user.employmentStatus = userRequestDto.employmentStatus;
      user.contractStartDate = userRequestDto.contractStartDate;
      user.salary = userRequestDto.salary;
      user.experienceYears = userRequestDto.experienceYears;
      user.experienceStatus = userRequestDto.experienceStatus;
      user.contractEndDate = userRequestDto.contractEndDate;
    }

    return user;
  }

  async updateEntity(updateUserInfoDto: UpdateUserInfoDto, user: User, date?: Birthday): Promise<User> {
    if (updateUserInfoDto.firstname) user.firstname = updateUserInfoDto.firstname;
    if (updateUserInfoDto.lastname) user.lastname = updateUserInfoDto.lastname;
    if (updateUserInfoDto.email) user.email = updateUserInfoDto.email;
    if (updateUserInfoDto.birthday) user.birthday = date;
    if (updateUserInfoDto.mobileNumber) user.mobileNumber = updateUserInfoDto.mobileNumber;
    if (updateUserInfoDto.country) user.country = updateUserInfoDto.country;
    return user;
  }
}
