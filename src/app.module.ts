import { Module } from '@nestjs/common';
import { UserModule } from '@infrastructure/modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@staff-system-db:27017/staff_system',
      {
        authSource: 'admin',
      },
    ),
    UserModule,
  ],
})
export class AppModule {}
