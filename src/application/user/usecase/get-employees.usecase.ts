import { PaginatorResponseDto } from '@application/dtos/response/paginator.response.dto';
import { RolesEnum } from '@domain/enums/roles.enum';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UserResponseFactory } from '../factories/user-response.factory';
import { UserResponseDto } from '../dtos/response/user.response.dto';
import { EmployeeResponseDto } from '../dtos/response/employee.response.dto';
import { PaginatorRequestDto } from '@application/dtos/request/paginator.request.dto';
import { Employee } from '@domain/entities/user/Employee';

@Injectable()
export class GetEmployeesUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(paginatorRequestDto: PaginatorRequestDto): Promise<PaginatorResponseDto<EmployeeResponseDto>> {
    const criteria = { roles: [RolesEnum.EMPLOYEE] };
    const page = paginatorRequestDto.page;
    const limit = paginatorRequestDto.limit;

    const employees = await this.userRepository.findMany(criteria, page, limit);

    return new PaginatorResponseDto(
      page,
      await this.userRepository.count(criteria),
      limit,
      employees.map((employee) => EmployeeResponseDto.createFromEntity(employee as Employee)),
    );
  }
}
