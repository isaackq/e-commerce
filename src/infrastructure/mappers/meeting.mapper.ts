import { MeetingDocument } from '@infrastructure/schemas/meeting.schema';
import { Meeting } from '@domain/entities/Meeting';
import { UserMapper } from './user.mapper';
import { ProjectMapper } from './project.mapper';

export class MeetingMapper {
  static map(meetingDocument: MeetingDocument | string): Meeting {
    const meeting = new Meeting();
    if (typeof meetingDocument === 'string') {
      meeting.id = meetingDocument;

      return meeting;
    }

    meeting.id = meetingDocument.id.toString();
    meeting.link = meetingDocument.link;
    meeting.description = meetingDocument.description;
    meeting.duration = meetingDocument.duration;
    meeting.startDate = meetingDocument.startDate;
    meeting.participants = meetingDocument.participants.map((userDocument) => UserMapper.map(userDocument as any));
    meeting.project = ProjectMapper.map(meetingDocument.project as any);

    return meeting;
  }
}
