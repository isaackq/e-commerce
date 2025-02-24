import { ApiProperty } from '@nestjs/swagger';
import { Position } from '@domain/entities/Position';

export class PositionResponseDto {
  @ApiProperty({ example: '123e4567e89b', description: 'Unique identifier of the position' })
  id: string;

  @ApiProperty({ example: 'Developper', description: 'name of the position' })
  name: string;

  public static createFromEntity(position: Position): PositionResponseDto {
    const positionResponseDto = new PositionResponseDto();
    positionResponseDto.id = position.id;
    positionResponseDto.name = position.name;

    return positionResponseDto;
  }
}
