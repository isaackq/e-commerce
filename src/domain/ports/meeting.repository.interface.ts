import { MeetingFilterDto } from '@application/meeting/dtos/filter/meeting.filter.dto';
import { Meeting } from '@domain/entities/Meeting';
import { FindOneRepositoryInterface } from './find-one.repository.interface';

export interface MeetingRepositoryInterface extends FindOneRepositoryInterface {
  save(meeting: Meeting): Promise<Meeting>;
  findOne(meetingId: string): Promise<Meeting>;
  findMany(userId: string, meetingFilterDto: MeetingFilterDto): Promise<Meeting[]>;
  update(meetingId: string, meeting: Meeting): Promise<Meeting>;
  delete(meetingId: string): Promise<void>;
}
