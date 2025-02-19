import { User } from '@domain/entities/User';
import { RolesEnum } from '@domain/enums/roles.enum';
import type { MessageRepositoryInterface } from '@domain/ports/message.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { MessageResponseDto } from '../dtos/response/message.response.dto';

@Injectable()
export class GetMessageUseCase {
  constructor(
    @Inject('MessageRepository')
    private readonly messageRepository: MessageRepositoryInterface,
  ) {}

  async execute(id: string, currentUser: User): Promise<MessageResponseDto | null> {
    let message = null;
    if (currentUser.role === RolesEnum.OWNER) {
      message = await this.messageRepository.findOne(id);
    } else {
      message = await this.messageRepository.findOne(id, currentUser);
    }

    if (!message) {
      return null;
    }

    return MessageResponseDto.createFromEntity(message);
  }
}
