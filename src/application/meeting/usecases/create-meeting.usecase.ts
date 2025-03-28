import { MeetingRequestDto } from '@application/meeting/dtos/request/meeting.request.dto';
import { MeetingRepositoryInterface } from '@domain/ports/meeting.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { MeetingTransformer } from '../transformers/meeting.transformer';
import { User } from '@domain/entities/user/User';
import { MeetingResponseDto } from '../dtos/response/meeting.response.dto';

@Injectable()
export class CreateMeetingUsecase {
  constructor(
    @Inject('MeetingRepository')
    private readonly meetingRepository: MeetingRepositoryInterface,
    private readonly meetingTransformer: MeetingTransformer,
  ) {}

  async execute(meetingRequestDto: MeetingRequestDto, user: User): Promise<MeetingResponseDto> {
    const meeting = await this.meetingTransformer.toEntitiy(meetingRequestDto);
    meeting.createdBy = user;

    return MeetingResponseDto.createFromEntity(await this.meetingRepository.save(meeting));
  }
}
