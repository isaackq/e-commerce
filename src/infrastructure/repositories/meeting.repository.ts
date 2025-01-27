import { Meeting } from '@domain/entities/Meeting';
import { MeetingRepositoryInterface } from '@domain/ports/meeting.repository.interface';
import {
  MeetingDocument,
  Meeting as MeetingSchema,
} from '@infrastructure/schemas/meeting.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MeetingRepository implements MeetingRepositoryInterface {
  constructor(
    @InjectModel(MeetingSchema.name)
    private meetingModel: Model<MeetingDocument>,
  ) {}

  async save(meeting: Meeting): Promise<Meeting> {
    const createdMeeting = await this.meetingModel.create(meeting);
    meeting.id = createdMeeting._id.toString();
    return meeting;
  }

  findOne(): void {}
}
