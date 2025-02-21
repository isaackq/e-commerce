import { HashingProviderInterface } from '@application/user/providers/hashing.provider.interface';
import { User } from '@domain/entities/User';
import type { UserCriteria, UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { UserMapper } from '@infrastructure/mappers/user.mapper';
import { UserDocument, User as UserSchema } from '@infrastructure/schemas/user.schema';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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

    const userDocument = await this.userModel.create({
      ...user,
      birthday: user.birthday.value,
      password: password,
    });

    return UserMapper.map(userDocument);
  }

  async findOne(id: string): Promise<User> {
    const userDocument = await this.userModel.findById(id).exec();

    if (!userDocument) {
      throw new NotFoundException('Invalid user id');
    }

    return UserMapper.map(userDocument);
  }

  async findOneByEmail(email: string): Promise<User> {
    const userDocument = await this.userModel.findOne({ email: email });

    if (!userDocument) {
      throw new NotFoundException('Invalid user email');
    }

    return UserMapper.map(userDocument);
  }

  async findMany(criteria?: Partial<UserCriteria>, page?: number, limit?: number): Promise<User[]> {
    const params = this.buildParams(criteria);

    const query = this.userModel.find(params);
    if (page && limit) {
      query.limit(limit).skip((page - 1) * limit);
    }
    const userDocuments = await query.exec();

    if (!userDocuments || userDocuments.length === 0) {
      return [];
    }

    return userDocuments.map((userDocument) => UserMapper.map(userDocument));
  }

  async count(criteria?: Partial<UserCriteria>): Promise<number> {
    const params = this.buildParams(criteria);

    return await this.userModel.find(params).countDocuments(params);
  }

  private buildParams(criteria?: Partial<UserCriteria>) {
    const params = {};

    if (criteria !== undefined) {
      const { ids, roles } = criteria;

      if (ids) {
        params['_id'] = { $in: ids };
      }

      if (roles) {
        params['role'] = { $in: roles };
      }
    }

    return params;
  }
}
