import { UserDto } from '@application/user/dtos/user.dto';
import { UserTransformer } from '@application/user/transformers/user.transformer';
import { User } from '@domain/entities/User';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RegistrationUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
  ) {}

  async execute(userDto: UserDto): Promise<User> {
    const user = this.userTransformer.toEntity(userDto);

    return await this.userRepository.save(user);
  }
}
