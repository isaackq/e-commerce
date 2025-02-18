import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model, Types } from 'mongoose';
import { User } from './user.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message extends Document {
  @Prop({ type: String, isRequired: true })
  title: string;

  @Prop({ type: String, isRequired: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  sentBy: Types.ObjectId;

  @Prop({ default: () => new Date(), immutable: true })
  sentAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export const MessageModel = model('Message', MessageSchema);
