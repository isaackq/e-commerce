import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({
    example: 'Hello',
    description: 'The title of the message',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    example: 'Hello World',
    description: 'The content of the message',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
