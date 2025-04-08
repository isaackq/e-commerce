import { User } from '@domain/entities/user/User';

export class UserRegisterationEvent {
  public user: User;

  constructor(user: User) {
    this.user = user;
  }
}
