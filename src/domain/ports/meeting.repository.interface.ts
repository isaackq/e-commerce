import { Meeting } from '@domain/entities/Meeting';

export type MeetingRepositoryInterface = {
  save(meeting: Meeting): Promise<Meeting>;
  findOne(): void;
};
