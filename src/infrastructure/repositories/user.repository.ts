import { User } from '@domain/entities/User';
import type { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import {
  UserDocument,
  User as UserSchema,
} from '@infrastructure/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserDocument>,
  ) {}

  async save(user: User): Promise<User> {
    const createdUser = await this.userModel.create({
      ...user,
      birthday: user.birthday.value,
    });

    user.id = createdUser._id.toString();

    return user;
  }

  findOne(): void {}
}
