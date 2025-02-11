import { User } from '@domain/entities/User';
import { Roles } from '@domain/enums/roles.enum';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(userRole: Roles): Promise<User[]> {
    const criteria = {};
    if (userRole === Roles.MANAGER) {
      criteria['roles'] = [Roles.EMPLOYEE, Roles.MANAGER];
    }

    return await this.userRepository.findMany(criteria);
  }
}
