import { User } from '@domain/entities/user/User';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { UpdateUserInfoDto } from '../dtos/request/update-user-info.dto';
import { UserTransformer } from '../transformers/user.transformer';
import { Birthday } from '@domain/objectsValues/Birthday';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { EmployeeResponseDto } from '../dtos/response/employee.response.dto';
import { ManagerResponseDto } from '../dtos/response/manager.response.dto';
import { OwnerResponseDto } from '../dtos/response/owner.response.dto';
import { RolesEnum } from '@domain/enums/roles.enum';
import { Owner } from '@domain/entities/user/Owner';
import { Manager } from '@domain/entities/user/Manager';
import { Employee } from '@domain/entities/user/Employee';

@Injectable()
export class UpdateUserInfoUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
  ) {}

  async execute(updateUserInfoDto: UpdateUserInfoDto, user: User) {
    const { hasEmailOrPhoneUpdate, date } = this.checkAtriputes(updateUserInfoDto, user);

    const updatedUser = await this.userTransformer.updateEntity(updateUserInfoDto, user, date);
    return await this.updateViaRole(updatedUser, hasEmailOrPhoneUpdate);
  }

  private checkAtriputes(updateUserInfoDto, user) {
    const keys = Object.keys(updateUserInfoDto) as (keyof UpdateUserInfoDto)[];

    let date: Birthday | null;
    let hasEmailOrPhoneUpdate: boolean = false;

    for (const key of keys) {
      if (key === 'email' || key === 'mobileNumber') {
        hasEmailOrPhoneUpdate = true;
      }
      if (key === 'birthday') {
        date = new Birthday(updateUserInfoDto[key]);

        if (date.value.getTime() === user[key].value.getTime()) {
          throw new BadRequestException(`No changes detected for property "${key}"`);
        }
      }
      if (String(updateUserInfoDto[key]) === String(user[key])) {
        throw new BadRequestException(`No changes detected for property "${key}"`);
      }
    }
    return { date: date, hasEmailOrPhoneUpdate: hasEmailOrPhoneUpdate };
  }

  private async updateViaRole(updatedUser: User, hasEmailOrPhoneUpdate: boolean) {
    if (updatedUser.getRole() === RolesEnum.EMPLOYEE) {
      return EmployeeResponseDto.createFromEntity(
        (await this.userRepository.updateUserInfo(updatedUser, hasEmailOrPhoneUpdate)) as Employee,
      );
    }
    if (updatedUser.getRole() === RolesEnum.MANAGER) {
      return ManagerResponseDto.createFromEntity(
        (await this.userRepository.updateUserInfo(updatedUser, hasEmailOrPhoneUpdate)) as Manager,
      );
    }
    if (updatedUser.getRole() === RolesEnum.OWNER) {
      return OwnerResponseDto.createFromEntity(
        (await this.userRepository.updateUserInfo(updatedUser, hasEmailOrPhoneUpdate)) as Owner,
      );
    }
  }
}
