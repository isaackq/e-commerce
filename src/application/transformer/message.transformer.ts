import { MessageDto } from "@application/dtos/message.dto";
import { Message } from "@domain/entities/Message";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessageTranformer {
  toEntity(messageDto:MessageDto): Message{
    const message = new Message();
    message.title = messageDto.title;
    message.content = messageDto.content;
    
    return message;
  }
}