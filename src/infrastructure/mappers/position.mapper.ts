import { PositionDocument } from '@infrastructure/schemas/position.schema';
import { Position } from '@domain/entities/Position';

export class PositionMapper {
  static map(positionDocument: PositionDocument | string): Position {
    const position = new Position();
    if (typeof positionDocument === 'string') {
      position.id = positionDocument;

      return position;
    }

    position.id = positionDocument.id;
    position.name = positionDocument.name;

    return position;
  }
}
