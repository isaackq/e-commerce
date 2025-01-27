import type { User } from '@domain/entities/User';

export interface UserRepositoryInterface {
  save(user: User): Promise<User>;
  findOne(): void;
  findMany(ids: string[]): Promise<Array<User>>;
}
