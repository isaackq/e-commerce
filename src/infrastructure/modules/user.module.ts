import { RegistrationUserUseCase } from '@application/usecase/registration-user.usecase';
import { UserController } from '@infrastructure/controllers/user.controller';
import { InMemoryUserRepository } from '@infrastructure/repositories/in-memory.user.repository';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [
    RegistrationUserUseCase,
    {
      provide: 'UserRepositoryInterface',
      useClass: InMemoryUserRepository
    }
  ],
})
export class UserModule {}
