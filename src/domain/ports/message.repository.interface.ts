import type { Message } from '@domain/entities/Message';
import { User } from '@domain/entities/User';

export interface MessageRepositoryInterface {
  save(message: Message): Promise<Message>;
  findOne(id: string, createdBy?: User): Promise<Message | null>;
}
