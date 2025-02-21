import { Message } from '@domain/entities/Message';
import { MessageDocument } from '@infrastructure/schemas/message.schema';
import { UserMapper } from './user.mapper';

export class MessageMapper {
  static map(messageDocument: MessageDocument | string): Message {
    const message = new Message();
    if (typeof messageDocument === 'string') {
      message.id = messageDocument;

      return message;
    }

    message.id = messageDocument.id;
    message.title = messageDocument.title;
    message.content = messageDocument.content;
    message.sentAt = messageDocument.sentAt;
    message.sentBy = UserMapper.map(messageDocument.sentBy as any);

    return message;
  }
}
