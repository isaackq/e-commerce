import { Position } from '@domain/entities/Position';
import { Rating } from '@domain/entities/Rating';
import { PositionRepositoryInterface } from '@domain/ports/position.repository.interface';
import { PositionMapper } from '@infrastructure/mappers/position.mapper';
import { PositionDocument, Position as PositionSchema } from '@infrastructure/schemas/position.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PositionRepository implements PositionRepositoryInterface {
  ratings: Rating[];

  constructor(
    @InjectModel(PositionSchema.name)
    private positionModel: Model<PositionDocument>,
  ) {}

  async findByIds(ids: string[]): Promise<Position[]> {
    const positionsDocuments = await this.positionModel.find({ _id: { $in: ids } }).exec();

    return positionsDocuments.map((positionDocument) => PositionMapper.map(positionDocument));
  }
}
