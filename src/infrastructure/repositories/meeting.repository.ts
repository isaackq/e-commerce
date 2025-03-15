import { Meeting } from '@domain/entities/Meeting';
import { MeetingRepositoryInterface } from '@domain/ports/meeting.repository.interface';
import { MeetingDocument, Meeting as MeetingSchema } from '@infrastructure/schemas/meeting.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeetingMapper } from '@infrastructure/mappers/meeting.mapper';
import { MeetingFilterDto } from '@application/meeting/dtos/filter/meeting.filter.dto';
import { RegisterRepository } from '@infrastructure/decorators/register-repository.decorator';

@RegisterRepository('Meeting')
@Injectable()
export class MeetingRepository implements MeetingRepositoryInterface {
  constructor(
    @InjectModel(MeetingSchema.name)
    private meetingModel: Model<MeetingDocument>,
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

  async findOne(meetingId: string): Promise<Meeting | null> {
    const meetingDocument = await this.meetingModel.findById(meetingId);

    if (!meetingDocument) {
      return null;
    }

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

  async update(meetingId: string, meeting: Meeting): Promise<Meeting> {
    const meetingDocument = await this.meetingModel
      .findByIdAndUpdate(
        meetingId,
        {
          ...meeting,
          project: meeting.project.id,
          participants: meeting.participants.map((participant) => participant.id),
        },
        { new: true },
      )
      .exec();

    return MeetingMapper.map(await meetingDocument.populate('project createdBy participants'));
  }
}
