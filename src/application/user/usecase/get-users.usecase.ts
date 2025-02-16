import { Paginator } from '@application/dtos/response/paginator.dto';
import { GetUsersPresenterInterface } from '@application/ports/get-users.presenter.interface';
import { User } from '@domain/entities/User';
import { Roles } from '@domain/enums/roles.enum';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('GetUsersPresenter')
    private readonly getUsersPresenter: GetUsersPresenterInterface,
  ) {}

  async execute(page: number, limit: number, userRole: Roles): Promise<Paginator<Partial<User>>> {
    const criteria = {};
    if (userRole === Roles.MANAGER) {
      criteria['roles'] = [Roles.EMPLOYEE, Roles.MANAGER];
    }

    const paginator = await this.userRepository.getPerPage(page, limit, criteria);

    return this.getUsersPresenter.present(paginator);
  }
}
