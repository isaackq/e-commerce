import { MessageDto } from "@application/dtos/message.dto";
import { SendMessageToSupportUseCase } from "@application/usecase/send-message-to-support.usecase";
import { Body, Controller, Get, Header, Post, ValidationPipe } from "@nestjs/common";

@Controller()
export class MessageController {
  constructor(private readonly createMessageUseCase: SendMessageToSupportUseCase) { }

  @Post('/message')
  @Header('Content-Type', 'application/json')
  async sendMessage(
    @Body(new ValidationPipe()) messageDto: MessageDto
  ): Promise<string> {
    const message = await this.createMessageUseCase.execute(messageDto);

    return JSON.stringify(message)
  }

  @Get('/message')
  getMessage() {
    return 'Hello World'
  }
  
}