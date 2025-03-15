import { RatingRepositoryInterface } from '@domain/ports/rating.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { RatingRequestDto } from '../dtos/request/rating.request.dto';
import { RatingTransformer } from '@application/transformer/rating.transformer';
import { Project } from '@domain/entities/Project';

@Injectable()
export class EditRatingUsecase {
  constructor(
    @Inject('RatingRepository')
    private readonly ratingRepository: RatingRepositoryInterface,
    private readonly ratingTransformer: RatingTransformer,
  ) {}

  async execute(project: Project, ratingDto: RatingRequestDto): Promise<void> {
    const rating = await this.ratingTransformer.toEntity(ratingDto);
    rating.project = project;

    await this.ratingRepository.save(rating);
  }
}
