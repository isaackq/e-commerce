import { Client } from '@domain/entities/Client';
import { ClientRepositoryInterface } from '@domain/ports/client.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientDocument, Client as ClientSchema } from '@infrastructure/schemas/client.schema';
import { Model } from 'mongoose';
import { ClientMapper } from '@infrastructure/mappers/client.mapper';

@Injectable()
export class ClientRepository implements ClientRepositoryInterface {
  constructor(@InjectModel(ClientSchema.name) private readonly clientModel: Model<ClientDocument>) {}

  async save(client: Client): Promise<Client> {
    const clientDocument = await this.clientModel.create(client);
    client = ClientMapper.map(clientDocument);

    return client;
  }
}
