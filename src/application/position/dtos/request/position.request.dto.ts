import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PositionRequestDto {
  @ApiProperty({ description: 'The name of the postion', example: 'developper' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}
