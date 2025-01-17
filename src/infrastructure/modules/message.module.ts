import { MessageController } from '@infrastructure/controllers/message.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message,MessageSchema } from '@infrastructure/schemas/message.schema';
import { SendMessageToSupportUseCase } from '@application/usecase/send-message-to-support.usecase';
import { Connection } from 'mongoose';
import { MessageRepository } from '@infrastructure/repositories/message.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name , schema: MessageSchema }]),  
  ],
  controllers: [MessageController],
  providers: [
    SendMessageToSupportUseCase,
    Connection,
    {
      provide: 'MessageRepository',
      useClass: MessageRepository,
    }
  ],
})
export class MessageModule {}
