import { MeetingRequestDto } from '@application/meeting/dtos/request/meeting.request.dto';
import { MeetingRepositoryInterface } from '@domain/ports/meeting.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { MeetingTransformer } from '../transformers/meeting.transformer';
import { MeetingResponseDto } from '../dtos/response/meeting.response.dto';
import { Meeting } from '@domain/entities/Meeting';

@Injectable()
export class UpdateMeetingUsecase {
  constructor(
    @Inject('MeetingRepository')
    private readonly meetingRepository: MeetingRepositoryInterface,
    private readonly meetingTransformer: MeetingTransformer,
  ) {}

  async execute(meeting: Meeting, meetingRequestDto: MeetingRequestDto): Promise<MeetingResponseDto> {
    const newMeeting = await this.meetingTransformer.toEntitiy(meetingRequestDto);

    return MeetingResponseDto.createFromEntity(await this.meetingRepository.update(meeting.id, newMeeting));
  }
}
