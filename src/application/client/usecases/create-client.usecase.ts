import { ClientRepositoryInterface } from '@domain/ports/client.repository.interface';
import { Inject } from '@nestjs/common';
import { ClientRequestDto } from '../dtos/client-request.dto';
import { ClientTransformer } from '../transformers/client.transformer';
import { Client } from '@domain/entities/Client';

export class CreateClientUseCase {
  constructor(
    @Inject('ClientRepository') private readonly clientRepository: ClientRepositoryInterface,
    private readonly clientTransformer: ClientTransformer,
  ) {}

  async execute(clientRequestDto: ClientRequestDto): Promise<Client> {
    const client = this.clientTransformer.toEntity(clientRequestDto);

    return await this.clientRepository.save(client);
  }
}
