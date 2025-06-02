import { Position } from '@domain/entities/Position';

export interface PositionRepositoryInterface {
  save(position: Position): Promise<Position>;
  findOne(position: string): Promise<Position | null>;
  findByIds(ids: string[]): Promise<Position[]>;
  findAll(): Promise<Position[]>;
  update(id: string, position: Position): Promise<Position>;
}
