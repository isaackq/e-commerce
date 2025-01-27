import { MeetingTransformer } from '@application/transformer/meeting.transformer';
import { CreateMeetingUsecase } from '@application/usecase/create-meeting.usecase';
import { MeetingController } from '@infrastructure/controllers/meeting.controller';
import { MeetingRepository } from '@infrastructure/repositories/meeting.repository';
import { Meeting, MeetingSchema } from '@infrastructure/schemas/meeting.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UserModule } from './user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]),
    UserModule,
  ],
  controllers: [MeetingController],
  providers: [
    CreateMeetingUsecase,
    MeetingTransformer,
    Connection,
    {
      provide: 'MeetingRepository',
      useClass: MeetingRepository,
    },
  ],
})
export class MeetingModule {}
