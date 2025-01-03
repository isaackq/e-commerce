import { UserDto } from '@application/dtos/user.dto';
import { User } from '@domain/entities/User';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RegistrationUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(userDto: UserDto): Promise<User> {
    // Hydrate the user entity from DTO
    const user = new User(
      userDto.firstname,
      userDto.lastname,
      userDto.email,
      userDto.birthday,
      userDto.mobileNumber,
    );

    return await this.userRepository.save(user);
  }
}
