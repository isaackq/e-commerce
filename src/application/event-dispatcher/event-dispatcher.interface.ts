import { Events } from './events/events';

export interface EventDispatcherInterface {
  dispatch<EventsEnum extends keyof Events>(event: EventsEnum, payload: Events[EventsEnum]): Promise<boolean>;
}
