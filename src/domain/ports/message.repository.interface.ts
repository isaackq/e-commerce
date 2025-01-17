import type { Message } from '@domain/entities/Message';

export interface MessageRepositoryInterface {
  save(message: Message):  Promise<Message> ;
  findOne(id: string): Promise<Message | null>;
}