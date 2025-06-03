import { Client } from '@domain/entities/Client';
import { ClientDocument } from '@infrastructure/schemas/client.schema';
import { ProjectMapper } from './project.mapper';

export class ClientMapper {
  static map(clientDocument: ClientDocument | string): Client {
    const client = new Client();

    if (typeof clientDocument === 'string') {
      client.id = clientDocument;
      return client;
    }

    client.id = clientDocument._id.toString();
    client.firstName = clientDocument.firstName;
    client.lastName = clientDocument.lastName;
    client.country = clientDocument.country;
    client.classification = clientDocument.classification;

    if (clientDocument.projects.length === 0) {
      client.projects = [];
    } else {
      client.projects = clientDocument.projects.map((project) => ProjectMapper.map(project as any));
    }

    return client;
  }
}
