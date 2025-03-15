import { CreatedByInterface } from '@domain/entities/CretaedByInterface';
import { User } from '@domain/entities/User';
import { Request } from 'express';

export interface AppRequest extends Request {
  user?: User;
  entity?: CreatedByInterface;
}
