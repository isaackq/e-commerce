import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model } from 'mongoose';

export type FollowUpDocument = HydratedDocument<FollowUp>;

@Schema()
export class FollowUp extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  project: number;

  @Prop({
    required: true,
  })
  employee: number;

  @Prop({
    type: String,
  })
  subject: string;

  @Prop()
  attachment?: string;
}

export const FollowUpSchema = SchemaFactory.createForClass(FollowUp);
export const FollowUpModel = model('FollowUp', FollowUpSchema);
