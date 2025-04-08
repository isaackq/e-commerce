import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Manager } from '@domain/entities/user/Manager';
import { ManagerResponseDto } from '../dtos/response/manager.response.dto';
import { ManagerRequestDto } from '../dtos/request/manager.request.dto';
import { UserTransformer } from '../transformers/user.transformer';
import { Events } from '@application/event-dispatcher/enums/events.enum';
import { UserRegisterationEvent } from '@application/event-dispatcher/events/user-registeration.event';
import { EventDispatcherInterface } from '@application/event-dispatcher/ports/event-dispatcher.interface';

@Injectable()
export class RegisterManagerUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
    @Inject('EventDispatcher')
    private readonly eventDispatcher: EventDispatcherInterface,
  ) {}

  async execute(managerRequestDto: ManagerRequestDto): Promise<ManagerResponseDto> {
    const manager = await this.userTransformer.toEntity(managerRequestDto);

    await this.eventDispatcher.dispatch(Events.USER_RESIGTERATION, new UserRegisterationEvent(manager));

    return ManagerResponseDto.createFromEntity((await this.userRepository.save(manager)) as Manager);
  }
}
