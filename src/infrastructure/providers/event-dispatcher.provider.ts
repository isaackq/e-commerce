import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventDispatcherInterface } from '@application/event-dispatcher/ports/event-dispatcher.interface';
import { Injectable } from '@nestjs/common';
import { Events } from '@application/event-dispatcher/events/events';
import { Events as EventsEnum } from '@application/event-dispatcher/enums/events.enum';

@Injectable()
export class EventDispatcher implements EventDispatcherInterface {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async dispatch(event: EventsEnum, payload: Events[EventsEnum]): Promise<boolean> {
    return await this.eventEmitter.emit(event, payload);
  }
}
