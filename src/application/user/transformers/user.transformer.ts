import { UserRequestDto } from '@application/user/dtos/request/user.request.dto';
import { User } from '@domain/entities/User';
import { Birthday } from '@domain/objectsValues/Birthday';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserTransformer {
  toEntity(userRequestDto: UserRequestDto): User {
    const user = new User();
    user.firstname = userRequestDto.firstname;
    user.lastname = userRequestDto.lastname;
    user.email = userRequestDto.email;
    user.password = userRequestDto.password;
    user.birthday = new Birthday(userRequestDto.birthday);
    user.mobileNumber = userRequestDto.mobileNumber;
    user.role = userRequestDto.role;

    return user;
  }
}
