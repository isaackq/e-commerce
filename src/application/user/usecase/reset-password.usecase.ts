import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject } from '@nestjs/common';
import { HashingProviderInterface } from '../providers/hashing.provider.interface';
import { ResetPasswordRequestDto } from '../dtos/request/reset-password.request.dto';
import { User } from '@domain/entities/user/User';

export class ResetPasswordUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRespository: UserRepositoryInterface,
    @Inject('HashingProvider')
    private hashingProvider: HashingProviderInterface,
  ) {}

  async execute(resetPasswordRequestDto: ResetPasswordRequestDto, user: User) {
    const encryptedPassword = await this.hashingProvider.hash(resetPasswordRequestDto.password);
    await this.userRespository.resetPassword(user.id, encryptedPassword);
  }
}
