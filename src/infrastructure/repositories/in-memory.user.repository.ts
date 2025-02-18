/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@domain/entities/User';
import type { UserCriteria, UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUserRepository implements UserRepositoryInterface {
  users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  async count(criteria?: Partial<UserCriteria>): Promise<number> {
    return this.users.length;
  }

  findOne(id: string): Promise<User | null> {
    return new Promise((resolve) => {
      const user = this.users.find((user) => user.id === id);
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return new Promise((resolve) => {
      const user = this.users.find((user) => user.email === email);
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  }

  async findMany(criteria?: Partial<UserCriteria>): Promise<User[]> {
    return this.users;
  }
}
