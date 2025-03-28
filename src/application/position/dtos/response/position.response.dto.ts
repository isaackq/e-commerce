import { ApiProperty } from '@nestjs/swagger';
import { Position } from '@domain/entities/Position';

export class PositionResponseDto {
  @ApiProperty({ example: '123e4567e89b', description: 'Unique identifier of the position', type: String })
  id: string;

  @ApiProperty({ example: 'Backend Developper', description: 'Name of the position', type: String })
  name: string;

  public static createFromEntity(position: Position): PositionResponseDto {
    const positionResponseDto = new PositionResponseDto();
    positionResponseDto.id = position.id;
    positionResponseDto.name = position.name;

    return positionResponseDto;
  }
}
