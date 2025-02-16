import { MessageDto } from '@application/dtos/request/message.dto';
import { SendMessageToSupportUseCase } from '@application/usecase/send-message-to-support.usecase';
import { Body, Controller, Get, Header, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('message')
@Controller()
export class MessageController {
  constructor(private readonly createMessageUseCase: SendMessageToSupportUseCase) {}

  @ApiOperation({ summary: 'Get a message' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return a message', type: MessageDto })
  @Get('/message')
  getMessage() {
    return 'Hello World';
  }

  @ApiOperation({ summary: 'Send a message to support' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The message has been successfully sent' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Post('/message')
  @Header('Content-Type', 'application/json')
  async sendMessage(@Body(new ValidationPipe()) messageDto: MessageDto): Promise<string> {
    const message = await this.createMessageUseCase.execute(messageDto);

    return JSON.stringify(message);
  }
}
