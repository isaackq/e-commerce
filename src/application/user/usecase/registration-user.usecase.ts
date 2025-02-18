import { UserTransformer } from '@application/user/transformers/user.transformer';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDto } from '../dtos/response/user.response.dto';
import { UserRequestDto } from '../dtos/request/user.request.dto';

@Injectable()
export class RegistrationUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
  ) {}

  async execute(userRequestDto: UserRequestDto): Promise<UserResponseDto> {
    const user = this.userTransformer.toEntity(userRequestDto);

    return UserResponseDto.createFromEntity(await this.userRepository.save(user));
  }
}
