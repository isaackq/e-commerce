import { User } from './user/User';

export interface CreatedByInterface {
  getCreatedBy(): User;
  setCreatedBy(user: User): void;
}
