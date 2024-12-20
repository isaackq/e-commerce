import type { User } from '@domain/entities/User';

export interface UserRepositoryInterface {
  save(registrationCommand: User): User;
  findOne(): User;
}
