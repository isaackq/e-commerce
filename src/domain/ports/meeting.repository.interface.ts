import { MeetingFilterDto } from '@application/meeting/dtos/filter/meeting.filter.dto';
import { Meeting } from '@domain/entities/Meeting';

export interface MeetingRepositoryInterface {
  save(meeting: Meeting): Promise<Meeting>;
  findMany(userId: string, meetingFilterDto: MeetingFilterDto): Promise<Meeting[]>;
}
