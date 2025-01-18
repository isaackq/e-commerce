import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from '@infrastructure/modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_PIPE } from '@nestjs/core';
import { MessageModule } from '@infrastructure/modules/message.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@staff-system-db:27017/staff_system',
      {
        authSource: 'admin',
      },
    ),
    UserModule,
    MessageModule,
  ],
  providers: [
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
