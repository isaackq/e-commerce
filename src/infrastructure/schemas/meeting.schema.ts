import { Project } from '@domain/entities/Project';
import { User } from '@domain/entities/User';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model } from 'mongoose';

export type MeetingDocument = HydratedDocument<Meeting>;

@Schema()
export class Meeting extends Document {
  @Prop({ type: String, isRequired: true, unique: true, trim: true })
  link: string;

  @Prop({ type: Project, isRequired: true })
  project: Project;

  @Prop({ type: Array<User>, isRequired: true })
  members: User[];

  @Prop({ type: Date, isRequired: true })
  startDate: Date;

  @Prop({ type: Date, isRequired: true })
  endDate: Date;

  @Prop({ type: String, isRequired: false })
  description: string;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
export const MeetingModel = model('Meeting', MeetingSchema);
