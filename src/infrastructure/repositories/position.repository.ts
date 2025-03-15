import { Position } from '@domain/entities/Position';
import { PositionRepositoryInterface } from '@domain/ports/position.repository.interface';
import { PositionMapper } from '@infrastructure/mappers/position.mapper';
import { PositionDocument, Position as PositionSchema } from '@infrastructure/schemas/position.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PositionRepository implements PositionRepositoryInterface {
  constructor(
    @InjectModel(PositionSchema.name)
    private positionModel: Model<PositionDocument>,
  ) {}

  async save(position: Position): Promise<Position> {
    const positionDocument = await this.positionModel.create(position);
    position.id = positionDocument._id.toString();

    return position;
  }

  async findByIds(ids: string[]): Promise<Position[]> {
    const positionDocument = await this.positionModel.find({ _id: { $in: ids } }).exec();

    return positionDocument.map((positionDocument) => PositionMapper.map(positionDocument));
  }
}
