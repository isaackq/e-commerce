import { CreateMeetingUsecase } from '@application/meeting/usecases/create-meeting.usecase';
import { MeetingController } from '@infrastructure/controllers/meeting.controller';
import { MeetingRepository } from '@infrastructure/repositories/meeting.repository';
import { Meeting, MeetingSchema } from '@infrastructure/schemas/meeting.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UserModule } from './user.module';
import { MeetingTransformer } from '@application/meeting/transformers/meeting.transformer';
import { GetMeetingsUsecase } from '@application/meeting/usecases/get-meetings.usecase';
import { ProjectModule } from './project.module';
import { UpdateMeetingUsecase } from '@application/meeting/usecases/update-meeting.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]), UserModule, ProjectModule],
  controllers: [MeetingController],
  providers: [
    CreateMeetingUsecase,
    GetMeetingsUsecase,
    UpdateMeetingUsecase,
    MeetingTransformer,
    Connection,
    {
      provide: 'MeetingRepository',
      useClass: MeetingRepository,
    },
  ],
  exports: [
    {
      provide: 'MeetingRepository',
      useClass: MeetingRepository,
    },
  ],
})
export class MeetingModule {}
