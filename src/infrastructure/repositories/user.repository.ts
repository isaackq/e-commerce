import { HashingProviderInterface } from '@application/user/providers/hashing.provider.interface';
import { User } from '@domain/entities/User';
import { Birthday } from '@domain/objectsValues/Birthday';
import type { UserCriteria, UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { UserDocument, User as UserSchema } from '@infrastructure/schemas/user.schema';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(UserSchema.name)
    private userModel: Model<UserDocument>,
    @Inject('HashingProvider')
    private hashingProvider: HashingProviderInterface,
  ) {}

  async save(user: User): Promise<User> {
    const password = await this.hashingProvider.hash(user.password);

    const createdUser = await this.userModel.create({
      ...user,
      birthday: user.birthday.value,
      password: password,
    });

    return this.make(createdUser);
  }

  async findOne(id: string): Promise<User | null> {
    const userDocument = await this.userModel.findById(id).exec();

    if (!userDocument) {
      return null;
    }

    return this.make(userDocument);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const userDocument = await this.userModel.findOne({ email: email });

    if (!userDocument) {
      return null;
    }

    return this.make(userDocument);
  }

  async findMany(criteria?: Partial<UserCriteria>): Promise<User[]> {
    const params = {};

    if (criteria !== undefined && 'ids' in criteria) {
      params['_id'] = { $in: criteria['ids'] };
    }

    if (criteria !== undefined && 'roles' in criteria) {
      params['role'] = { $in: criteria['roles'] };
    }

    const userDocuments = await this.userModel.find(params).exec();

    const users: User[] = userDocuments.map((doc) => this.make(doc));

    return users;
  }

  private make(userDocument: UserDocument): User {
    const user = new User();
    user.id = userDocument._id.toString();
    user.firstname = userDocument.firstname;
    user.lastname = userDocument.lastname;
    user.email = userDocument.email;
    user.password = userDocument.password;
    user.birthday = new Birthday(userDocument.birthday);
    user.mobileNumber = userDocument.mobileNumber;
    user.role = userDocument.role;

    return user;
  }
}
