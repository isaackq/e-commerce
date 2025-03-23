import { PositionTransformer } from '../transformer/position.transformer';
import { Inject, Injectable } from '@nestjs/common';
import { PositionRepositoryInterface } from '@domain/ports/position.repository.interface';
import { PositionRequestDto } from '../dtos/request/position.request.dto';
import { PositionResponseDto } from '../dtos/response/position.response.dto';

@Injectable()
export class CreatePositionUsecase {
  constructor(
    private readonly postionTransformer: PositionTransformer,
    @Inject('PositionRepository')
    private readonly positionRepository: PositionRepositoryInterface,
  ) {}

  async execute(positionRequestDto: PositionRequestDto): Promise<PositionResponseDto> {
    const position = await this.postionTransformer.toEntity(positionRequestDto);

    return PositionResponseDto.createFromEntity(await this.positionRepository.save(position));
  }
}
