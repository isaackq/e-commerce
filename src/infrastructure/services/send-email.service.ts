import { EventPayloads } from '@domain/payloads/event.payloads';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EmailService {
  @OnEvent('user.verify-email')
  async verifyEmail(payload: EventPayloads['user.verify-email']): Promise<boolean> {
    console.log(`Hello ${payload.name}, please verify you email ${payload.email} here`);
    return true;
  }
}
