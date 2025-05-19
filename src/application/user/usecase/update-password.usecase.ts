import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { HashingProviderInterface } from '../providers/hashing.provider.interface';
import { UpdatePasswordRequestDto } from '../dtos/request/update-password.request.dto';
import { User } from '@domain/entities/user/User';
import { UpdatePasswordResponseDto } from '../dtos/response/update-password.response.dto';

@Injectable()
export class UpdatePasswordUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly userRespository: UserRepositoryInterface,
    @Inject('HashingProvider')
    private readonly hashingProvider: HashingProviderInterface,
  ) {}

  async execute(updatePasswordRequestDto: UpdatePasswordRequestDto, user: User) {
    if (updatePasswordRequestDto.oldPassword === updatePasswordRequestDto.newPassword) {
      throw new ConflictException('New password cannot be the same as old password');
    }

    const isEqual = await this.hashingProvider.compare(updatePasswordRequestDto.oldPassword, user.password);

    if (!isEqual) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashedPassword = await this.hashingProvider.hash(updatePasswordRequestDto.newPassword);
    user.password = hashedPassword;

    await this.userRespository.resetPassword(user.id, hashedPassword);

    return UpdatePasswordResponseDto.fromMessage('Password updated successfully');
  }
}
