import type { User } from '@domain/entities/User';
import type { UserRepositoryInterface } from '@domain/ports/user.repository.interface';

export class InMemoryUserRepository implements UserRepositoryInterface {
  users: User[] = [];

  save(registrationCommand: User): User {
    this.users.push(registrationCommand);

    return registrationCommand;
  }

  findOne(): User {
    return this.users[0];
  }
}
