import { RatingRepositoryInterface } from '@domain/ports/rating.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { RatingResponseDto } from '../dtos/response/rating.response.dto';
import { User } from '@domain/entities/User';

@Injectable()
export class GetEmployeeRatingsUsecase {
  constructor(
    @Inject('RatingRepository')
    private readonly ratingRepository: RatingRepositoryInterface,
  ) {}

  async execute(user: User): Promise<RatingResponseDto[]> {
    const ratings = await this.ratingRepository.findByEmployeeId(user.id);

    return ratings.map((rating) => RatingResponseDto.createFromEntity(rating));
  }
}
