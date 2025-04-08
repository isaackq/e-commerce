import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { OwnerRequestDto } from '../dtos/request/owner.request.dto';
import { Owner } from '@domain/entities/user/Owner';
import { OwnerResponseDto } from '../dtos/response/owner.response.dto';
import { UserTransformer } from '../transformers/user.transformer';
import { Events } from '@application/event-dispatcher/enums/events.enum';
import { UserRegisterationEvent } from '@application/event-dispatcher/events/user-registeration.event';
import { EventDispatcherInterface } from '@application/event-dispatcher/event-dispatcher.interface';

@Injectable()
export class RegisterOwnerUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
    @Inject('EventDispatcher')
    private readonly eventDispatcher: EventDispatcherInterface,
  ) {}

  async execute(ownerRequestDto: OwnerRequestDto): Promise<OwnerResponseDto> {
    const owner = await this.userTransformer.toEntity(ownerRequestDto);

    await this.eventDispatcher.dispatch(Events.USER_RESIGTERATION, new UserRegisterationEvent(owner));

    return OwnerResponseDto.createFromEntity((await this.userRepository.save(owner)) as Owner);
  }
}
