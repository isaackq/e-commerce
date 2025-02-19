import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from '@infrastructure/modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MessageModule } from '@infrastructure/modules/message.module';
import { MeetingModule } from '@infrastructure/modules/meeting.module';
import { TokenGuard } from '@application/user/guards/token.guard';
import { FollowUpModule } from '@infrastructure/modules/follow-up.module';
import { RatingModule } from '@infrastructure/modules/rating.module';
import { ProjectModule } from '@infrastructure/modules/project.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@staff-system-db:27017/staff_system', {
      authSource: 'admin',
    }),
    UserModule,
    MessageModule,
    MeetingModule,
    FollowUpModule,
    RatingModule,
    ProjectModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule {}
