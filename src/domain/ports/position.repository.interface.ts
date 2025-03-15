import { Position } from '@domain/entities/Position';

export interface PositionRepositoryInterface {
  save(position: Position): Promise<Position>;
  findByIds(ids: string[]): Promise<Position[]>;
}
