import { Injectable } from '@nestjs/common';
import { ClientRequestDto } from '../dtos/client-request.dto';
import { Client } from '@domain/entities/Client';

@Injectable()
export class ClientTransformer {
  toEntity(clientDto: ClientRequestDto) {
    const client = new Client();

    client.firstName = clientDto.firstName;
    client.lastName = clientDto.lastName;
    client.classification = clientDto.classification;
    client.country = clientDto.country;
    client.identityNumber = clientDto.identityNumber;

    return client;
  }
}
