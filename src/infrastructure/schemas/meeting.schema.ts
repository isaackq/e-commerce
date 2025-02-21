import { Project } from '@domain/entities/Project';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model, Types } from 'mongoose';
import { User } from './user.schema';

export type MeetingDocument = HydratedDocument<Meeting>;

@Schema()
export class Meeting extends Document {
  @Prop({ type: String, isRequired: true, trim: true })
  link: string;

  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  project: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, isRequired: true })
  createdBy: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: User.name, isRequired: true })
  participants: Types.ObjectId[];

  @Prop({ type: Date, isRequired: true })
  startDate: Date;

  @Prop({ type: Number, isRequired: true })
  duration: number;

  @Prop({ type: String })
  description: string;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
export const MeetingModel = model(Meeting.name, MeetingSchema);
