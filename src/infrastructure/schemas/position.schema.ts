import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model } from 'mongoose';

export type PositionDocument = HydratedDocument<Position>;

@Schema()
export class Position extends Document {
  @Prop({ type: String, isRequired: true })
  name: string;
}

export const PositionSchema = SchemaFactory.createForClass(Position);
export const MessageModel = model(Position.name, PositionSchema);
