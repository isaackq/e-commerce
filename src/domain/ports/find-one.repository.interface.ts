import { CreatedByInterface } from '@domain/entities/CretaedByInterface';

export interface FindOneRepositoryInterface {
  findOne(id: string): Promise<CreatedByInterface | null>;
}
