import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { Events } from '@application/event-dispatcher/events/events';
import { Events as EventsEnum } from '@application/event-dispatcher/enums/events.enum';
import { EventDispatcherInterface } from '@application/event-dispatcher/event-dispatcher.interface';

@Injectable()
export class EventDispatcher implements EventDispatcherInterface {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async dispatch(event: EventsEnum, payload: Events[EventsEnum]): Promise<boolean> {
    return await this.eventEmitter.emit(event, payload);
  }
}
