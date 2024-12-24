import { UserDto } from '@application/dtos/user.dto';
import { User } from '@domain/entities/User';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RegistrationUserUseCase {
  constructor(@Inject('UserRepositoryInterface') private readonly userRepository: UserRepositoryInterface) {}

  execute(userDto: UserDto): User {
    const user = new User(
      userDto.firstname,
      userDto.lastname,
      userDto.email,
      userDto.birthday,
      userDto.mobileNumber
    )
    
    return this.userRepository.save(user);
  }
}
