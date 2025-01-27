import { User } from '@domain/entities/User';
import { Birthday } from '@domain/objectsValues/Birthday';
import type { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import {
  UserDocument,
  User as UserSchema,
} from '@infrastructure/schemas/user.schema';
import { Inject, Injectable } from '@nestjs/common';
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

  async findMany(ids: string[]): Promise<Array<User>> {
    const userDocuments = await this.userModel
      .find({ _id: { $in: ids } })
      .exec();

    const users: Array<User> = userDocuments.map((doc) => this.make(doc));

    return users;
  }

  private make(userDocument: UserDocument): User {
    const user = new User();
    user.id = userDocument._id.toString();
    user.firstname = userDocument.firstname;
    user.lastname = userDocument.lastname;
    user.email = userDocument.email;
    user.birthday = new Birthday(userDocument.birthday);
    user.mobileNumber = userDocument.mobileNumber;

    return user;
  }
}
