import { User } from '@domain/entities/user/User';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { UpdateUserInfoDto } from '../dtos/request/update-user-info.dto';
import { UserTransformer } from '../transformers/user.transformer';
import { Birthday } from '@domain/objectsValues/Birthday';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { UserResponseDto } from '../dtos/response/user.response.dto';

@Injectable()
export class UpdateUserInfoUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
  ) {}

  async execute(updateUserInfoDto: UpdateUserInfoDto, user: User) {
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

    if (!date) {
      const updatedUser = await this.userTransformer.updateEntity(updateUserInfoDto, user);
      return await UserResponseDto.createFromEntity(
        await this.userRepository.updateUserInfo(user.id, updatedUser, hasEmailOrPhoneUpdate),
      );
    }
    const updatedUser = await this.userTransformer.updateEntity(updateUserInfoDto, user, date);
    return await UserResponseDto.createFromEntity(
      await this.userRepository.updateUserInfo(user.id, updatedUser, hasEmailOrPhoneUpdate),
    );
  }
}
