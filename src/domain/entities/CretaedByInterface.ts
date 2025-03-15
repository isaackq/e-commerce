import { User } from './User';

export interface CreatedByInterface {
  getCreatedBy(): User;
  setCreatedBy(user: User): void;
}
