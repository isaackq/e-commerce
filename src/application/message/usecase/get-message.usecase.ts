import { Injectable } from '@nestjs/common';
import { MessageResponseDto } from '../dtos/response/message.response.dto';
import { Message } from '@domain/entities/Message';

@Injectable()
export class GetMessageUseCase {
  async execute(message: Message): Promise<MessageResponseDto | null> {
    return MessageResponseDto.createFromEntity(message);
  }
}
