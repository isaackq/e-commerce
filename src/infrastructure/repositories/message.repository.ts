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
  constructor(@InjectModel('Message') private messageModel: Model<MessageDocument>) {}
  async save(message: Message): Promise<Message> {
    const messageDocument = await this.messageModel.create({
      ...message,
      sentBy: message.sentBy.id,
    });

    return MessageMapper.map(await messageDocument.populate('sentBy'));
  }

  async findOne(id: string, createdBy?: User): Promise<Message | null> {
    const params = { _id: id };
    if (createdBy) {
      params['sentBy'] = createdBy.id;
    }

    const messageDocument = await await this.messageModel.findOne(params).populate('sentBy').exec();
    if (!messageDocument) {
      return null;
    }

    return MessageMapper.map(messageDocument);
  }
}
