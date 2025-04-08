import { Events as EventsEnum } from '../enums/events.enum';
import { UserRegisterationEvent } from './user-registeration.event';

export interface Events {
  [EventsEnum.USER_RESIGTERATION]: UserRegisterationEvent;
}
