import { MessageDto } from '@application/dtos/message.dto';
import { MessageTranformer } from '@application/transformer/message.transformer';
import { Message } from '@domain/entities/Message';
import type { MessageRepositoryInterface } from '@domain/ports/message.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SendMessageToSupportUseCase {
  constructor(
    @Inject('MessageRepository')
    private readonly messageRepository: MessageRepositoryInterface,
    private readonly messageTransformer: MessageTranformer,
  ) {}

  async execute(messageDto: MessageDto): Promise<Message> {
    // const message = new Message(messageDto.title, messageDto.content);
    const message = this.messageTransformer.toEntity(messageDto);

    return await this.messageRepository.save(message);
  }
}
