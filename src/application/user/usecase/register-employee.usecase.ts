import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRequestDto } from '../dtos/request/employee.request.dto';
import { EmployeeResponseDto } from '../dtos/response/employee.response.dto';
import { Employee } from '@domain/entities/user/Employee';
import { UserTransformer } from '../transformers/user.transformer';
import { Events } from '@application/event-dispatcher/enums/events.enum';
import { UserRegisterationEvent } from '@application/event-dispatcher/events/user-registeration.event';
import { EventDispatcherInterface } from '@application/event-dispatcher/ports/event-dispatcher.interface';

@Injectable()
export class RegisterEmployeeUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
    @Inject('EventDispatcher')
    private readonly eventDispatcher: EventDispatcherInterface,
  ) {}

  async execute(employeeRequestDto: EmployeeRequestDto): Promise<EmployeeResponseDto> {
    const employee = await this.userTransformer.toEntity(employeeRequestDto);

    await this.eventDispatcher.dispatch(Events.USER_RESIGTERATION, new UserRegisterationEvent(employee));

    return EmployeeResponseDto.createFromEntity((await this.userRepository.save(employee)) as Employee);
  }
}
