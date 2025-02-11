import { Message } from '@domain/entities/Message';
import { MessageRepositoryInterface } from '@domain/ports/message.repository.interface';
import { MessageDocument } from '@infrastructure/schemas/message.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageRepository implements MessageRepositoryInterface {
  constructor(@InjectModel('Message') private messageModel: Model<MessageDocument>) {}
  async save(message: Message): Promise<Message> {
    const createdMessage = await this.messageModel.create({
      ...message,
    });

    message.id = createdMessage._id.toString();

    return message;
  }

  async findOne(id: string): Promise<Message | null> {
    const messageModel = await this.messageModel.findById(id).exec();
    if (!messageModel) {
      return null;
    }

    return messageModel;
  }
}
