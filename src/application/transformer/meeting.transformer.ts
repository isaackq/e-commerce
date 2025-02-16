import { MeetingDto } from '@application/dtos/request/meeting.dto';
import { Meeting } from '@domain/entities/Meeting';
import { Project } from '@domain/entities/Project';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MeetingTransformer {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async toEntitiy(meetingDto: MeetingDto) {
    const meeting = new Meeting();

    meeting.link = meetingDto.link;
    meeting.project = new Project(); // get project by id
    meeting.members = await this.userRepository.findMany({ ids: meetingDto.members }); //get members by ids
    if (meeting.members.length !== meetingDto.members.length) {
      throw new BadRequestException('Unvalid user id list');
    }
    meeting.startDate = meetingDto.startDate;
    meeting.endDate = meetingDto.startDate;
    meeting.description = meetingDto.description;

    return meeting;
  }
}
