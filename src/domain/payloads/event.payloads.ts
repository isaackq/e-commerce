import { UserRegisterationEvent } from '@infrastructure/events/user-registeration.event';

export interface EventPayloads {
  'user.verify-email': UserRegisterationEvent;
}
