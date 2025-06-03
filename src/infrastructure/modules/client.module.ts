import { ClientTransformer } from '@application/client/transformers/client.transformer';
import { CreateClientUseCase } from '@application/client/usecases/create-client.usecase';
import { ClientController } from '@infrastructure/controllers/client.controller';
import { ClientRepository } from '@infrastructure/repositories/client.repository';
import { Client, ClientSchema } from '@infrastructure/schemas/client.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  // add schema
  imports: [MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }])],
  controllers: [ClientController],
  providers: [
    ClientTransformer,
    CreateClientUseCase,
    Connection,
    {
      provide: 'ClientRepository',
      useClass: ClientRepository,
    },
  ],
  exports: [],
})
export class ClientModule {}
