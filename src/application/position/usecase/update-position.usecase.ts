import { Inject, Injectable } from '@nestjs/common';
import { PositionRequestDto } from '../dtos/request/position.request.dto';
import { PositionTransformer } from '../transformer/position.transformer';
import { PositionRepositoryInterface } from '@domain/ports/position.repository.interface';
import { PositionResponseDto } from '../dtos/response/position.response.dto';

@Injectable()
export class UpdatePositionUseCase {
  constructor(
    private readonly positionTransformer: PositionTransformer,
    @Inject('PositionRepository') private readonly positionRepository: PositionRepositoryInterface,
  ) {}

  async execute(id: string, newPositon: PositionRequestDto): Promise<PositionResponseDto> {
    const position = await this.positionTransformer.toEntity(newPositon);

    return PositionResponseDto.createFromEntity(await this.positionRepository.update(id, position));
  }
}
