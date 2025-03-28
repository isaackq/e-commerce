import { MeetingRepositoryInterface } from '@domain/ports/meeting.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Meeting } from '@domain/entities/Meeting';

@Injectable()
export class DeleteMeetingUsecase {
  constructor(
    @Inject('MeetingRepository')
    private readonly meetingRepository: MeetingRepositoryInterface,
  ) {}

  async execute(meeting: Meeting): Promise<void> {
    await this.meetingRepository.delete(meeting.id);
  }
}
