import { UserTransformer } from '@application/transformer/user.transformer';
import { RegistrationUserUseCase } from '@application/usecase/registration-user.usecase';
import { UserController } from '@infrastructure/controllers/user.controller';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { User, UserSchema } from '@infrastructure/schemas/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    RegistrationUserUseCase,
    UserTransformer,
    Connection,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [{ provide: 'UserRepository', useClass: UserRepository }],
})
export class UserModule {}
