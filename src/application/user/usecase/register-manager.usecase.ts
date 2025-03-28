import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Manager } from '@domain/entities/user/Manager';
import { ManagerResponseDto } from '../dtos/response/manager.response.dto';
import { ManagerRequestDto } from '../dtos/request/manager.request.dto';
import { UserTransformer } from '../transformers/user.transformer';

@Injectable()
export class RegisterManagerUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
  ) {}

  async execute(managerRequestDto: ManagerRequestDto): Promise<ManagerResponseDto> {
    const manager = await this.userTransformer.toEntity(managerRequestDto);

    return ManagerResponseDto.createFromEntity((await this.userRepository.save(manager)) as Manager);
  }
}
