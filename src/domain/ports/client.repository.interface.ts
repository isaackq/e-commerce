import { Client } from '@domain/entities/Client';

export interface ClientRepositoryInterface {
  save(client: Client): Promise<Client>;
}
