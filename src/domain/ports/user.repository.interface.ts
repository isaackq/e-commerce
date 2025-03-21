import type { User } from '@domain/entities/User';
import { RolesEnum } from '@domain/enums/roles.enum';

export type UserCriteria = {
  ids: string[];
  roles: RolesEnum[];
};

export interface UserRepositoryInterface {
  save(user: User): Promise<User>;
  findOne(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  findMany(criteria?: Partial<UserCriteria>, page?: number, limit?: number): Promise<User[]>;
  count(criteria?: Partial<UserCriteria>): Promise<number>;
  findOneByEmail(email: string): Promise<User | null>;
  resetPassword(id: string, newPassword: string): Promise<User>;
}
