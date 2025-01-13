import { UserDto } from '@application/dtos/user.dto';
import { User } from '@domain/entities/User';
import { Birthday } from '@domain/objectsValues/Birthday';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserTransformer {

  toEntity(userDto: UserDto): User {
    const user = new User();
    user.firstname = userDto.firstname;
    user.lastname = userDto.lastname;
    user.email = userDto.email;
    user.birthday = new Birthday(userDto.birthday);
    user.mobileNumber = userDto.mobileNumber;

    return user;
  }
}