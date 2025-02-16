import { MeetingDto } from '@application/dtos/request/meeting.dto';
import { CreateMeetingUsecase } from '@application/usecase/create-meeting.usecase';
import { Body, Controller, Get, Header, Post, ValidationPipe } from '@nestjs/common';

@Controller()
export class MeetingController {
  constructor(private readonly createMeetingUsecase: CreateMeetingUsecase) {}

  @Post('/meetings')
  @Header('Content-Type', 'application/json')
  async create(@Body(new ValidationPipe()) meetingDto: MeetingDto): Promise<string> {
    const meeting = await this.createMeetingUsecase.execute(meetingDto);
    return JSON.stringify(meeting);
  }

  @Get('/meetings')
  getMeetings(): string {
    return 'get all meetings';
  }
}
