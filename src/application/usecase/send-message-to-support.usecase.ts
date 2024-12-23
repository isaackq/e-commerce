import type { Message } from '@domain/entities/Message';

export class SendMessageToSupportUseCase {
  message: Message | null = null;
  execute(messageToSupportCommand: Message) {
    this.message = messageToSupportCommand;
  }
}
