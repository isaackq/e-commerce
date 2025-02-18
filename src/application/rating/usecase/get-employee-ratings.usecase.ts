import { RatingRepositoryInterface } from '@domain/ports/rating.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { RatingResponseDto } from '../dtos/response/rating.response.dto';

@Injectable()
export class GetEmployeeRatingsUsecase {
  constructor(
    @Inject('RatingRepository')
    private readonly ratingRepository: RatingRepositoryInterface,
  ) {}

  async execute(employeeId: string): Promise<RatingResponseDto[]> {
    const ratings = await this.ratingRepository.findByEmployeeId(employeeId);

    return ratings.map((rating) => RatingResponseDto.createFromEntity(rating));
  }
}
