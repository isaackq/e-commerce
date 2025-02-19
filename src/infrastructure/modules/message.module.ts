import { MessageController } from '@infrastructure/controllers/message.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from '@infrastructure/schemas/message.schema';
import { CreateMessageUseCase } from '@application/message/usecase/create-message.usecase';
import { Connection } from 'mongoose';
import { MessageRepository } from '@infrastructure/repositories/message.repository';
import { MessageTranformer } from '@application/transformer/message.transformer';
import { GetMessageUseCase } from '@application/message/usecase/get-message.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
  controllers: [MessageController],
  providers: [
    CreateMessageUseCase,
    GetMessageUseCase,
    MessageTranformer,
    Connection,
    {
      provide: 'MessageRepository',
      useClass: MessageRepository,
    },
  ],
})
export class MessageModule {}
