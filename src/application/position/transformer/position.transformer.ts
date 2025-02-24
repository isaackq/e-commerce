import { PositionRequestDto } from '../dtos/request/position.request.dto';
import { Position } from '@domain/entities/Position';

export class PositionTransformer {
  async toEntity(positionRequestDto: PositionRequestDto): Promise<Position> {
    const position = new Position();
    position.name = positionRequestDto.name;

    return position;
  }
}
