import { Inject, Injectable } from '@nestjs/common';
import { PositionRepositoryInterface } from '@domain/ports/position.repository.interface';
import { PositionResponseDto } from '../dtos/response/position.response.dto';

@Injectable()
export class GetPositionsUsecase {
  constructor(
    @Inject('PositionRepository')
    private readonly positionRepository: PositionRepositoryInterface,
  ) {}

  async execute(): Promise<PositionResponseDto[]> {
    const positions = await this.positionRepository.findAll();

    return positions.map((position) => PositionResponseDto.createFromEntity(position));
  }
}
