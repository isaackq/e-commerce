import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message extends Document {
  @Prop({
    type: String,
    isRequired: true,
  })
  title: string;

  @Prop({
    type: String,
    isRequired: true,
  })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export const MessageModel = model('Message', MessageSchema);
