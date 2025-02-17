import { FollowUp } from '@domain/entities/FollowUp';
import { FollowUpRepositoryInterface } from '@domain/ports/follow-up.repository.interface';
import { FollowUpDocument } from '@infrastructure/schemas/follow-up.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FollowUpRepository implements FollowUpRepositoryInterface {
  constructor(
    @InjectModel(FollowUp.name)
    private followUpModel: Model<FollowUpDocument>,
  ) {}

  async save(followUp: FollowUp): Promise<FollowUp> {
    const createdFollowUp = await this.followUpModel.create(followUp);
    followUp.id = await createdFollowUp._id.toString();

    return followUp;
  }

  findOne(): void {}
}
