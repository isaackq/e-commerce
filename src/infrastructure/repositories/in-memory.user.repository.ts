/* eslint-disable @typescript-eslint/no-unused-vars */
import { Paginator } from '@application/dtos/response/paginator.dto';
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

  async findMany(criteria?: Partial<UserCriteria>): Promise<Array<User>> {
    return this.users;
  }

  getPerPage(page: number, itemPerPage: number, criteria?: Partial<UserCriteria>): Promise<Paginator<User>> {
    return new Promise((resolve) => {
      resolve(new Paginator(1, 100, 10, this.users));
    });
  }
}
