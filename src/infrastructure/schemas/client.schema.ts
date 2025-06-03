import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model, Types } from 'mongoose';
import { Project } from './project.schema';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client extends Document {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  classification: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true, unique: true })
  identityNumber: string;

  @Prop({ type: [Types.ObjectId], default: [], ref: Project.name })
  projects: Types.ObjectId[];

  @Prop({ type: String, required: true })
  evaluation: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
export const ClientModel = model(Client.name, ClientSchema);
