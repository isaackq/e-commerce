import type { User } from '@domain/entities/User';

export interface UserRepositoryInterface {
  save(user: User): User;
  findOne(): User;
}