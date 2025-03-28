import { MeetingRepositoryInterface } from '@domain/ports/meeting.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { MeetingResponseDto } from '../dtos/response/meeting.response.dto';
import { User } from '@domain/entities/user/User';
import { MeetingFilterDto } from '../dtos/filter/meeting.filter.dto';

@Injectable()
export class GetMeetingsUsecase {
  constructor(
    @Inject('MeetingRepository')
    private readonly meetingRepository: MeetingRepositoryInterface,
  ) {}

  async execute(currentUser: User, meetingFilterDto: MeetingFilterDto): Promise<MeetingResponseDto[]> {
    const meetings = await this.meetingRepository.findMany(currentUser.id, meetingFilterDto);

    return meetings.map((meeting) => MeetingResponseDto.createFromEntity(meeting));
  }
}
