import type { Message } from '@domain/entities/Message';
import type { MessageRepositoryInterface } from '@domain/ports/message.repository.interface';

export class RequiredError extends Error {}

export class SendMessageToSupportUseCase {
  constructor(private readonly messageRepository: MessageRepositoryInterface) {}

  execute(messageToSupportCommand: Message) {
    if (
      messageToSupportCommand.title.length === 0 ||
      messageToSupportCommand.subject.length === 0
    ) {
      throw new RequiredError();
    }
    this.messageRepository.save(messageToSupportCommand);
  }
}
