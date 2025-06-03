import { Global, Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from '@infrastructure/modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD, APP_PIPE, DiscoveryService } from '@nestjs/core';
import { MessageModule } from '@infrastructure/modules/message.module';
import { MeetingModule } from '@infrastructure/modules/meeting.module';
import { TokenGuard } from '@infrastructure/guards/token.guard';
import { FollowUpModule } from '@infrastructure/modules/follow-up.module';
import { RatingModule } from '@infrastructure/modules/rating.module';
import { ProjectModule } from '@infrastructure/modules/project.module';
import { PositiontModule } from '@infrastructure/modules/position.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'config/database.config';
import appConfig from 'config/app.config';
import userPasswordConfig from 'config/user-password.config';
import { RepositoryLocator } from '@infrastructure/locators/repository.locator';
import jwtConfig from 'config/jwt.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventDispatcher } from '@infrastructure/providers/event-dispatcher.provider';
import { EmailProvider } from '@infrastructure/providers/send-email.provider';
import { ClientModule } from '@infrastructure/modules/client.module';

const ENV = process.env.NODE_ENV;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [databaseConfig, appConfig, userPasswordConfig, jwtConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          uri: configService.get('database.uri'),
          authSource: configService.get('database.authSource'),
        };
      },
    }),
    EventEmitterModule.forRoot({}),
    UserModule,
    MessageModule,
    MeetingModule,
    FollowUpModule,
    RatingModule,
    ProjectModule,
    PositiontModule,
    ClientModule,
  ],
  providers: [
    DiscoveryService,
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
    {
      provide: 'EventDispatcher',
      useClass: EventDispatcher,
    },
    {
      provide: 'EmailProvider',
      useClass: EmailProvider,
    },
    RepositoryLocator,
    {
      provide: 'EmailProvider',
      useClass: EmailProvider,
    },
  ],
  exports: [
    RepositoryLocator,
    {
      provide: 'EmailProvider',
      useClass: EmailProvider,
    },
    {
      provide: 'EventDispatcher',
      useClass: EventDispatcher,
    },
  ],
})
export class AppModule {}
