import { ApiProperty } from '@nestjs/swagger';
import { Message } from '@domain/entities/Message';
import { UserResponseDto } from '@application/user/dtos/response/user.response.dto';
import { UserResponseFactory } from '@application/user/factories/user-response.factory';

export class MessageResponseDto {
  @ApiProperty({ description: 'Unique message ID', example: '65c1b7f5d4f1a4567890abcd' })
  public readonly id: string;

  @ApiProperty({ description: 'Title of the message', example: 'System Update' })
  public readonly title: string;

  @ApiProperty({ description: 'Content of the message', example: 'The system will be down for maintenance.' })
  public readonly content: string;

  @ApiProperty({ description: 'User who sent the message', type: UserResponseDto })
  public readonly sentBy: UserResponseDto;

  @ApiProperty({ description: 'Date and time the message was sent', example: '2025-02-17T12:00:00.000Z' })
  public readonly sentAt: Date;

  constructor(id: string, title: string, content: string, sentBy: UserResponseDto, sentAt: Date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.sentBy = sentBy;
    this.sentAt = sentAt;
  }

  public static createFromEntity(message: Message): MessageResponseDto {
    return new MessageResponseDto(
      message.id,
      message.title,
      message.content,
      UserResponseFactory.createFromEntity(message.sentBy),
      message.sentAt,
    );
  }
}
