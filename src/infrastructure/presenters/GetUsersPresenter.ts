import { Paginator } from '@application/dtos/response/paginator.dto';
import { GetUsersPresenterInterface } from '@application/ports/get-users.presenter.interface';
import { User } from '@domain/entities/User';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUsersPresenter implements GetUsersPresenterInterface {
  present(paginator: Paginator<User>): Paginator<Partial<User>> {
    paginator.data = paginator.data.map((user: User) => {
      delete user.password;

      return user;
    });

    return paginator;
  }
}
