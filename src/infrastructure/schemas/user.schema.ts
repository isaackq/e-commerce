import { RolesEnum } from '@domain/enums/roles.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model, Types } from 'mongoose';
import { Position } from './position.schema';
import { EmploymentEnum } from '@domain/enums/employment.enum';
import { EmploymentStatusEnum } from '@domain/enums/employment-status.enum';
import { ExperienceEnum } from '@domain/enums/experience.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  // User attributes
  @Prop({ type: String, required: true })
  lastname: string;

  @Prop({ type: String, required: true })
  firstname: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Date, required: true })
  birthday: Date;

  @Prop({ type: String, unique: true })
  mobileNumber: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  nationality: string;

  @Prop({ enum: RolesEnum, required: true })
  role: RolesEnum;

  // Employee attributes
  @Prop({
    type: Types.ObjectId,
    ref: Position.name,
    required: function (this: User) {
      return this.role === RolesEnum.EMPLOYEE;
    },
  })
  position: Types.ObjectId;

  // Employee and Manager attributes
  @Prop({
    enum: EmploymentEnum,
    required: function (this: User) {
      return [RolesEnum.EMPLOYEE, RolesEnum.MANAGER].includes(this.role);
    },
  })
  employment: EmploymentEnum;

  @Prop({
    enum: EmploymentStatusEnum,
    required: function (this: User) {
      return [RolesEnum.EMPLOYEE, RolesEnum.MANAGER].includes(this.role);
    },
  })
  employmentStatus: EmploymentStatusEnum;

  @Prop({
    type: Date,
    required: function (this: User) {
      return [RolesEnum.EMPLOYEE, RolesEnum.MANAGER].includes(this.role);
    },
  })
  contractStartDate: Date;

  @Prop({
    type: Date,
    required: function (this: User) {
      return [RolesEnum.EMPLOYEE, RolesEnum.MANAGER].includes(this.role);
    },
  })
  contractEndDate: Date;

  @Prop({
    type: Number,
    required: function (this: User) {
      return [RolesEnum.EMPLOYEE, RolesEnum.MANAGER].includes(this.role);
    },
  })
  salary: number;

  @Prop({
    type: Number,
    required: function (this: User) {
      return [RolesEnum.EMPLOYEE, RolesEnum.MANAGER].includes(this.role);
    },
  })
  experienceYears: number;

  @Prop({
    enum: ExperienceEnum,
    required: function (this: User) {
      return [RolesEnum.EMPLOYEE, RolesEnum.MANAGER].includes(this.role);
    },
  })
  experienceStatus: ExperienceEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = model('User', UserSchema);
