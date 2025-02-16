import { Meeting } from '@domain/entities/Meeting';

export interface MeetingRepositoryInterface {
  save(meeting: Meeting): Promise<Meeting>;
  findOne(): void;
}
