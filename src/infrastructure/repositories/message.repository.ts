import { Message } from '@domain/entities/Message';
import { MessageRepositoryInterface } from '@domain/ports/message.repository.interface';
import { RegisterRepository } from '@infrastructure/decorators/register-repository.decorator';
import { MessageMapper } from '@infrastructure/mappers/message.mapper';
import { MessageDocument } from '@infrastructure/schemas/message.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@RegisterRepository('Message')
@Injectable()
export class MessageRepository implements MessageRepositoryInterface {
  constructor(@InjectModel('Message') private readonly messageModel: Model<MessageDocument>) {}
  async save(message: Message): Promise<Message> {
    const messageDocument = await this.messageModel.create({
      ...message,
      sentBy: message.sentBy.id,
    });

    return MessageMapper.map(await messageDocument.populate('sentBy'));
  }

  async findOne(id: string): Promise<Message | null> {
    const messageDocument = await this.messageModel.findById(id).exec();

    if (!messageDocument) {
      return null;
    }

    return MessageMapper.map(messageDocument);
  }
}
