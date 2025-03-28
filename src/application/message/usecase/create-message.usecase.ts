import { MessageTranformer } from '@application/transformer/message.transformer';
import { User } from '@domain/entities/user/User';
import type { MessageRepositoryInterface } from '@domain/ports/message.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { MessageRequestDto } from '../dtos/request/message.request.dto';
import { MessageResponseDto } from '../dtos/response/message.response.dto';

@Injectable()
export class CreateMessageUseCase {
  constructor(
    @Inject('MessageRepository')
    private readonly messageRepository: MessageRepositoryInterface,
    private readonly messageTransformer: MessageTranformer,
  ) {}

  async execute(messageRequestDto: MessageRequestDto, currentUser: User): Promise<MessageResponseDto> {
    const message = this.messageTransformer.toEntity(messageRequestDto);
    message.sentBy = currentUser;

    return MessageResponseDto.createFromEntity(await this.messageRepository.save(message));
  }
}
