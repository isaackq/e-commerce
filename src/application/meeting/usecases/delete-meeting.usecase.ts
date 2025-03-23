import { MeetingRequestDto } from '@application/meeting/dtos/request/meeting.request.dto';
import { MeetingRepositoryInterface } from '@domain/ports/meeting.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { MeetingTransformer } from '../transformers/meeting.transformer';
import { User } from '@domain/entities/User';
import { MeetingResponseDto } from '../dtos/response/meeting.response.dto';
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
