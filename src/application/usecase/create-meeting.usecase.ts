import { MeetingDto } from '@application/dtos/meeting.dto';
import { MeetingTransformer } from '@application/transformer/meeting.transformer';
import { Meeting } from '@domain/entities/Meeting';
import { MeetingRepositoryInterface } from '@domain/ports/meeting.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateMeetingUsecase {
  constructor(
    @Inject('MeetingRepository')
    private readonly meetingRepository: MeetingRepositoryInterface,
    private readonly meetingTransformer: MeetingTransformer,
  ) {}

  async execute(meetingDto: MeetingDto): Promise<Meeting> {
    const meeting = await this.meetingTransformer.toEntitiy(meetingDto);
    return await this.meetingRepository.save(meeting);
  }
}
