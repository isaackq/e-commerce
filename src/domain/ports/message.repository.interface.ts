import type { Message } from '@domain/entities/Message';
import { FindOneRepositoryInterface } from './find-one.repository.interface';

export interface MessageRepositoryInterface extends FindOneRepositoryInterface {
  save(message: Message): Promise<Message>;
  findOne(id: string): Promise<Message | null>;
}
