import { Injectable } from '@nestjs/common';
import { User } from '@domain/entities/user/User';
import { UserResponseFactory } from '../factories/user-response.factory';
import { UserResponseDto } from '../dtos/response/user.response.dto';

@Injectable()
export class GetUserDetailsUseCase {
  async execute(user: User): Promise<UserResponseDto> {
    return UserResponseFactory.createFromEntity(user);
  }
}
