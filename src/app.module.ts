import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from './user/infrastructure/modules/.module';
import { ModulesModule } from './user/infrastructure/modules.module';
import { UserModule } from './infrastructure/modules/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb'), Module, ModulesModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
