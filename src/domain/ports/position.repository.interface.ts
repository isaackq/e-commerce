import { Position } from '@domain/entities/Position';

export interface PositionRepositoryInterface {
  findByIds(ids: string[]): Promise<Position[]>;
  save(position: Position): Promise<Position>;
}
