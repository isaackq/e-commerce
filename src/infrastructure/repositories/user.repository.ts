import { Paginator } from '@application/dtos/response/paginator.dto';
import { HashingProviderInterface } from '@application/user/providers/hashing.provider.interface';
import { User } from '@domain/entities/User';
import { Birthday } from '@domain/objectsValues/Birthday';
import type { UserCriteria, UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { UserDocument, User as UserSchema } from '@infrastructure/schemas/user.schema';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
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
    const existingUsers = await this.userModel
      .find({
        $or: [{ email: user.email }, { mobileNumber: user.mobileNumber }],
      })
      .exec();

    if (existingUsers.length > 0) {
      throw new ConflictException('A user with email and/or mobileNumber already exists.');
    }

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

  async getPerPage(page: number, limit: number, criteria?: Partial<UserCriteria>): Promise<Paginator<User>> {
    const params = {};

    if (criteria !== undefined) {
      const { ids, role } = criteria;

      if (ids) {
        params['_id'] = { $in: ids };
      }

      if (role) {
        params['role'] = { role: role };
      }
    }

    const userDocuments = await this.userModel
      .find(params)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await this.userModel.find(params).countDocuments(params);

    const users: User[] = userDocuments.map((doc) => this.make(doc));

    return new Paginator<User>(page, count, limit, users);
  }

  async findMany(criteria?: Partial<UserCriteria>): Promise<User[]> {
    const params = {};

    if (criteria !== undefined) {
      const { ids, role } = criteria;

      if (ids) {
        params['_id'] = { $in: ids };
      }

      if (role) {
        params['role'] = { role: role };
      }
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
