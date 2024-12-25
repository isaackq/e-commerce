import { Module } from '@nestjs/common';
import { UserModule } from '@infrastructure/modules/user.module';

@Module({
  imports: [
    UserModule,
  ],
})
export class AppModule {}
