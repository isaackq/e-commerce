import { PaginatorResponseDto } from '@application/dtos/response/paginator.response.dto';
import { RolesEnum } from '@domain/enums/roles.enum';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { EmployeeResponseDto } from '../dtos/response/employee.response.dto';
import { Employee } from '@domain/entities/user/Employee';
import { UserQueryDto } from '../dtos/request/query.dto';

@Injectable()
export class GetEmployeesUsecase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(userQueryDto: UserQueryDto): Promise<PaginatorResponseDto<EmployeeResponseDto>> {
    let name = userQueryDto.name;
    let [firstname, lastname] = name ? name.split(' ') : [];
    const criteria = { roles: [RolesEnum.EMPLOYEE], firstname, lastname };
    const page = userQueryDto.page;
    const limit = userQueryDto.limit;

    const employees = await this.userRepository.findMany(criteria, page, limit);

    return new PaginatorResponseDto(
      page,
      await this.userRepository.count(criteria),
      limit,
      employees.map((employee) => EmployeeResponseDto.createFromEntity(employee as Employee)),
    );
  }
}
