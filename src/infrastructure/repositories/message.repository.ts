import { Message } from '@domain/entities/Message';
import { User } from '@domain/entities/User';
import { MessageRepositoryInterface } from '@domain/ports/message.repository.interface';
import { MessageMapper } from '@infrastructure/mappers/message.mapper';
import { MessageDocument } from '@infrastructure/schemas/message.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

  async findOne(id: string, sentBy?: User): Promise<Message | null> {
    const messageDocument = await await this.messageModel.findById(id).exec();

    if (!messageDocument) {
      return null;
    }

    if (sentBy && messageDocument.sentBy.toString() !== sentBy.id) {
      return null;
    }

    return MessageMapper.map(messageDocument);
  }
}
