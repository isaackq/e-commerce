import { RatingRepositoryInterface } from '@domain/ports/rating.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { RatingResponseDto } from '../dtos/response/rating.response.dto';
import { Project } from '@domain/entities/Project';

@Injectable()
export class GetProjectRatingsUsecase {
  constructor(
    @Inject('RatingRepository')
    private readonly ratingRepository: RatingRepositoryInterface,
  ) {}

  async execute(project: Project): Promise<RatingResponseDto[]> {
    const ratings = await this.ratingRepository.findByProjectId(project.id);

    return ratings.map((rating) => RatingResponseDto.createFromEntity(rating));
  }
}
