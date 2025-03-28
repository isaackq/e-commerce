import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { OwnerRequestDto } from '../dtos/request/owner.request.dto';
import { Owner } from '@domain/entities/user/Owner';
import { OwnerResponseDto } from '../dtos/response/owner.response.dto';
import { UserTransformer } from '../transformers/user.transformer';

@Injectable()
export class RegisterOwnerUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
  ) {}

  async execute(ownerRequestDto: OwnerRequestDto): Promise<OwnerResponseDto> {
    const owner = await this.userTransformer.toEntity(ownerRequestDto);

    return OwnerResponseDto.createFromEntity((await this.userRepository.save(owner)) as Owner);
  }
}
