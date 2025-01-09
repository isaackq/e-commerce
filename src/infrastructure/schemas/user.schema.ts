import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @Prop({
    type: String,
    isRequired: true,
  })
  lastname: string;

  @Prop({
    type: String,
    isRequired: true,
  })
  firstname: string;

  @Prop({
    type: String,
    isRequired: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: Date,
    isRequired: true,
  })
  birthday: Date;

  @Prop({
    type: String,
    unique: true,
  })
  mobileNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = model('User', UserSchema);
