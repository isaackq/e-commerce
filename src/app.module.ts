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
import { PositiontModule } from '@infrastructure/modules/position.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'config/database.config';
import appConfig from 'config/app.config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [databaseConfig, appConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          uri: configService.get('database.uri'),
          authSource: configService.get('database.authSource'),
        };
      },
    }),
    UserModule,
    MessageModule,
    MeetingModule,
    FollowUpModule,
    RatingModule,
    ProjectModule,
    PositiontModule,
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
