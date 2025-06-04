/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@domain/entities/user/User';
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

  async resetPassword(id: string, newPassword: string): Promise<User> {
    return this.users[0];
  }

  async updateUserInfo(id: string, updatedUser: User, hasEmailOrPhoneUpdate?: boolean) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    if (hasEmailOrPhoneUpdate) {
      if (this.users.some((u, i) => i !== index && u.email === updatedUser.email)) {
        throw new Error('A user with the same email already exists');
      }
      if (this.users.some((u, i) => i !== index && u.mobileNumber === updatedUser.mobileNumber)) {
        throw new Error('A user with the same mobile Number already exists');
      }
    }
    this.users[index] = updatedUser;
    return this.users[index];
  }
}
