import { Events } from '../events/events';
import { Events as EventsEnum } from '../enums/events.enum';

export interface EventListenerInterface {
  listen(event: Events[EventsEnum]): Promise<boolean>;
}
