import { User } from '@domain/entities/User';
import type { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUserRepository implements UserRepositoryInterface {  
  users: User[] = [];

  save(user: User): User {
    this.users.push(user);
    
    return user;
  }

  findOne(): User {
    return this.users[0];
  }
}
