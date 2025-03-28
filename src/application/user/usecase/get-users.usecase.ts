import { RolesEnum } from '@domain/enums/roles.enum';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PaginatorResponseDto } from '@application/dtos/response/paginator.response.dto';
import { UserResponseFactory } from '../factories/user-response.factory';
import { UserResponseDto } from '../dtos/response/user.response.dto';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(page: number, limit: number, userRole: RolesEnum): Promise<PaginatorResponseDto<UserResponseDto>> {
    const criteria = {};
    if (userRole === RolesEnum.MANAGER) {
      criteria['roles'] = [RolesEnum.EMPLOYEE, RolesEnum.MANAGER];
    }

    const users = this.userRepository.findMany(criteria, page, limit);

    return new PaginatorResponseDto(
      page,
      await this.userRepository.count(criteria),
      limit,
      (await users).map((user) => UserResponseFactory.createFromEntity(user)),
    );
  }
}
