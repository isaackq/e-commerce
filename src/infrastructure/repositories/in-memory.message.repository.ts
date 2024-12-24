import type { Message } from '@domain/entities/Message';
import type { MessageRepositoryInterface } from '@domain/ports/message.repository.interface';

export class InMemoryMessageRepository implements MessageRepositoryInterface {
  messages: Message[] = [];
  save(registrationCommand: Message): Message {
    this.messages.push(registrationCommand);
    return registrationCommand;
  }
  findOne(): Message {
    return this.messages[0];
  }
}
