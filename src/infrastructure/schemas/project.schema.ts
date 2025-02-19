import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model, Types } from 'mongoose';
import { User } from './user.schema';
import { Position } from './position.schema';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  document: string;

  @Prop({ type: Date, required: true })
  startedAt: string;

  @Prop({ type: String, required: true })
  endedAt: string;

  @Prop({ type: [Types.ObjectId], ref: Position.name })
  positions: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  createdBy: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
export const ProjectModel = model('Project', ProjectSchema);
