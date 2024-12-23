import type { Message } from '@domain/entities/Message';

export interface MessageRepositoryInterface {
  save(registrationCommand: Message): Message;
  findOne(): Message;
}
