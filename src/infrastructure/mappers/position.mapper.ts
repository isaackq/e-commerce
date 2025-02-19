import { PositionDocument } from '@infrastructure/schemas/position.schema';
import { Position } from '@domain/entities/Position';

export class PositionMapper {
  static map(positionDocument: PositionDocument): Position {
    const position = new Position();
    position.id = positionDocument.id;
    position.name = positionDocument.name;

    return position;
  }
}
