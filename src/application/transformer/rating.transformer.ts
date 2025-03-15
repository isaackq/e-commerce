import { RatingRequestDto } from '@application/rating/dtos/request/rating.request.dto';
import { Rating } from '@domain/entities/Rating';
import { ProjectRepositoryInterface } from '@domain/ports/project.repository.interface';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RatingTransformer {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepositoryInterface,
  ) {}

  async toEntity(ratingDto: RatingRequestDto): Promise<Rating> {
    const employee = await this.userRepository.findOne(ratingDto.employeeId);

    if (!employee) {
      throw new BadRequestException('employee id invalid');
    }

    const rating = new Rating();
    rating.employee = employee;
    rating.value = ratingDto.value;

    return rating;
  }
}
