import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model, Types } from 'mongoose';
import { User } from './user.schema';
import { Project } from './project.schema';

export type RatingDocument = HydratedDocument<Rating>;

@Schema()
export class Rating extends Document {
  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  project: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  employee: Types.ObjectId;

  @Prop({ required: true, min: 0, max: 5 })
  value: number;

  @Prop({ default: () => new Date(), immutable: true })
  createdAt: Date;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
export const RatingModel = model('Rating', RatingSchema);
