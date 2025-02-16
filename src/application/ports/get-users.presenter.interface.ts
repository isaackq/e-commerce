import { Paginator } from '@application/dtos/response/paginator.dto';
import { User } from '@domain/entities/User';

export interface GetUsersPresenterInterface {
  present(paginator: Paginator<User>): Paginator<Partial<User>>;
}
