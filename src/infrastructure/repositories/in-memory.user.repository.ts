import { User } from '@domain/entities/User';
import type { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUserRepository implements UserRepositoryInterface {
  users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  findOne(): User {
    return this.users[0];
  }

  async findMany(ids: string[]): Promise<Array<User>> {
    return this.users;
  }
}
