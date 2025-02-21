import { MeetingRequestDto } from '@application/meeting/dtos/request/meeting.request.dto';
import { Meeting } from '@domain/entities/Meeting';
import { ProjectRepositoryInterface } from '@domain/ports/project.repository.interface';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MeetingTransformer {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepositoryInterface,
  ) {}

  async toEntitiy(meetingRequestDto: MeetingRequestDto) {
    const participants = await this.userRepository.findMany({ ids: meetingRequestDto.participantsIds });
    if (participants.length !== meetingRequestDto.participantsIds.length) {
      throw new BadRequestException('One or many participants ids not found');
    }

    const project = await this.projectRepository.findOne(meetingRequestDto.projectId);
    if (!project) {
      throw new BadRequestException('Project not found');
    }

    const meeting = new Meeting();

    meeting.link = meetingRequestDto.link;
    meeting.project = project;
    meeting.participants = participants;
    meeting.startDate = meetingRequestDto.startDate;
    meeting.duration = meetingRequestDto.duration;
    meeting.description = meetingRequestDto.description;

    return meeting;
  }
}
