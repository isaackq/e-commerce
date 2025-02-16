import { Paginator } from '@application/dtos/response/paginator.dto';
import type { User } from '@domain/entities/User';
import { Roles } from '@domain/enums/roles.enum';

export type UserCriteria = {
  ids: string[];
  role: Roles;
};

export interface UserRepositoryInterface {
  save(user: User): Promise<User>;
  findOne(id: string): Promise<User | null>;
  findMany(criteria?: Partial<UserCriteria>): Promise<User[]>;
  getPerPage(page: number, limit: number, criteria?: Partial<UserCriteria>): Promise<Paginator<User>>;
  findOne(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
}
