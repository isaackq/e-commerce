import { MessageRequestDto } from '@application/message/dtos/request/message.request.dto';
import { Message } from '@domain/entities/Message';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageTranformer {
  toEntity(messageRequestDto: MessageRequestDto): Message {
    const message = new Message();
    message.title = messageRequestDto.title;
    message.content = messageRequestDto.content;

    return message;
  }
}
