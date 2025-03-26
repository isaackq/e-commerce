import { EventPayloads } from '@domain/payloads/event.payloads';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TypedEventEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emit<T extends keyof EventPayloads>(event: T, payload: EventPayloads[T]): Promise<boolean> {
    return await this.eventEmitter.emit(event, payload);
  }
}
