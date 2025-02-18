import { RatingRepositoryInterface } from '@domain/ports/rating.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { RatingResponseDto } from '../dtos/response/rating.response.dto';

@Injectable()
export class GetProjectRatingsUsecase {
  constructor(
    @Inject('RatingRepository')
    private readonly ratingRepository: RatingRepositoryInterface,
  ) {}

  async execute(projectId: string): Promise<RatingResponseDto[]> {
    const ratings = await this.ratingRepository.findByProjectId(projectId);

    return ratings.map((rating) => RatingResponseDto.createFromEntity(rating));
  }
}
