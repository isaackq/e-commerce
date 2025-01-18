import type { Message } from '@domain/entities/Message';
import type { MessageRepositoryInterface } from '@domain/ports/message.repository.interface';

export class InMemoryMessageRepository implements MessageRepositoryInterface {
  messages: Message[] = [];
  async save(registrationCommand: Message): Promise<Message> {
    this.messages.push(registrationCommand);
    return registrationCommand;
  }
  
  async findOne(id: string): Promise<Message | undefined> {
    let message =  this.messages.find((message) => message.id === id);
    if (!message) {
      throw new Error('Message not found');
    } 

    return this.messages[0];
  }
}
