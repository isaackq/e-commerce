import { Meeting } from '@domain/entities/Meeting';
import { MeetingRepositoryInterface } from '@domain/ports/meeting.repository.interface';
import { MeetingDocument, Meeting as MeetingSchema } from '@infrastructure/schemas/meeting.schema';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from './user.repository';
import { MeetingMapper } from '@infrastructure/mappers/meeting.mapper';
import { MeetingFilterDto } from '@application/meeting/dtos/filter/meeting.filter.dto';

@Injectable()
export class MeetingRepository implements MeetingRepositoryInterface {
  constructor(
    @InjectModel(MeetingSchema.name)
    private meetingModel: Model<MeetingDocument>,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async save(meeting: Meeting): Promise<Meeting> {
    const meetingDocument = await this.meetingModel.create({
      ...meeting,
      project: meeting.project.id,
      createdBy: meeting.createdBy.id,
      participants: meeting.participants.map((participant) => participant.id),
    });

    return MeetingMapper.map(await meetingDocument.populate('project createdBy participants'));
  }

  async findMany(userId: string, meetingFilterDto: MeetingFilterDto): Promise<Meeting[]> {
    const meetingsDocuments = await this.meetingModel
      .find({
        createdBy: userId,
        startDate: {
          $gte: meetingFilterDto.startDate,
          $lte: meetingFilterDto.endDate,
        },
      })
      .exec();

    return meetingsDocuments.map((meetingDocument) => MeetingMapper.map(meetingDocument));
  }
}
