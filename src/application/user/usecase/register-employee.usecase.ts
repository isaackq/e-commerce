import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRequestDto } from '../dtos/request/employee.request.dto';
import { EmployeeResponseDto } from '../dtos/response/employee.response.dto';
import { Employee } from '@domain/entities/user/Employee';
import { UserTransformer } from '../transformers/user.transformer';

@Injectable()
export class RegisterEmployeeUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
  ) {}

  async execute(employeeRequestDto: EmployeeRequestDto): Promise<EmployeeResponseDto> {
    const employee = await this.userTransformer.toEntity(employeeRequestDto);

    return EmployeeResponseDto.createFromEntity((await this.userRepository.save(employee)) as Employee);
  }
}
