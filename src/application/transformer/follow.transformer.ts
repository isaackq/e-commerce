import { Injectable } from '@nestjs/common';
import { FollowUpDto } from '@application/dtos/follow-up.dto';
import { FollowUp } from '@domain/entities/FollowUp';

@Injectable()
export class FollowUpTransformer {
  toEntitiy(followUpDto: FollowUpDto): FollowUp {
    const followUp = new FollowUp();
    followUp.project = followUpDto.project;
    followUp.employee = followUpDto.employee;
    followUp.subject = followUpDto.subject;
    followUp.attachment = followUpDto.attachment;

    return followUp;
  }
}
