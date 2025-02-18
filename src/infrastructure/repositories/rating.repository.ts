import { Rating } from '@domain/entities/Rating';
import { RatingRepositoryInterface } from '@domain/ports/rating.repository.interface';
import { RatingMapper } from '@infrastructure/mappers/rating.mapper';
import { RatingDocument, Rating as RatingSchema } from '@infrastructure/schemas/rating.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RatingRepository implements RatingRepositoryInterface {
  ratings: Rating[];

  constructor(
    @InjectModel(RatingSchema.name)
    private ratingModel: Model<RatingDocument>,
  ) {}

  async save(rating: Rating): Promise<void> {
    await this.ratingModel
      .findOneAndUpdate(
        {
          $and: [{ project: rating.project.id }, { employee: rating.employee.id }],
        },
        { $set: { value: rating.value } },
        { new: true, upsert: true, runValidators: true },
      )
      .exec();
  }

  async findByProjectId(projectId: string): Promise<Rating[]> {
    const ratingsDocuments = await this.ratingModel.find({ project: projectId }).exec();

    return ratingsDocuments.map((ratingDocument) => RatingMapper.map(ratingDocument));
  }

  async findByEmployeeId(employeeId: string): Promise<Rating[]> {
    const ratingsDocuments = await this.ratingModel.find({ employee: employeeId }).exec();

    return ratingsDocuments.map((ratingDocument) => RatingMapper.map(ratingDocument));
  }
}
