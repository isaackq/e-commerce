import { ResetPasswordTokenGuard } from '@infrastructure/guards/reset-password-token.guard';
import { UserTransformer } from '@application/user/transformers/user.transformer';
import { ForgotPasswordUseCase } from '@application/user/usecase/forgot-password.usecase';
import { GetUsersUseCase } from '@application/user/usecase/get-users.usecase';
import { LoginUseCase } from '@application/user/usecase/login.usecase';
import { RefreshTokenUseCase } from '@application/user/usecase/refresh-token.usecase';
import { RegisterEmployeeUseCase } from '@application/user/usecase/register-employee.usecase';
import { RegisterManagerUseCase } from '@application/user/usecase/register-manager.usecase';
import { RegisterOwnerUseCase } from '@application/user/usecase/register-owner.usecase';
import { ResetPasswordUseCase } from '@application/user/usecase/reset-password.usecase';
import { AuthController } from '@infrastructure/controllers/auth.controller';
import { ResetPasswordController } from '@infrastructure/controllers/reset-password.controller';
import { UserController } from '@infrastructure/controllers/user.controller';
import { BcryptHashingProvider } from '@infrastructure/providers/bcrypt.hashing.provider';
import { JwtTokenGenerator } from '@infrastructure/providers/jwt.token-generator.provider';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { User, UserSchema } from '@infrastructure/schemas/user.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { IsPasswordValidator } from '@infrastructure/validators/is-password.validator';
import { PositiontModule } from './position.module';
import jwtConfig from 'config/jwt.config';
import { GetUserDetailsUseCase } from '@application/user/usecase/get-user-details.usecase';
import { SendWelcomeEmailListener } from '@application/event-dispatcher/listeners/send-welcome-email.listener';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwtConfig.secret'),
          signOptions: configService.get('jwtConfig.signOptions'),
        };
      },
      global: true,
    }),
    PositiontModule,
  ],
  controllers: [UserController, AuthController, ResetPasswordController],
  providers: [
    RegisterEmployeeUseCase,
    RegisterManagerUseCase,
    RegisterOwnerUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    UserTransformer,
    GetUsersUseCase,
    GetUserDetailsUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    Connection,
    IsPasswordValidator,
    SendWelcomeEmailListener,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'HashingProvider',
      useClass: BcryptHashingProvider,
    },
    {
      provide: 'TokenGenerator',
      useClass: JwtTokenGenerator,
    },
    {
      provide: 'ResetPasswordTokenGuard',
      useClass: ResetPasswordTokenGuard,
    },
  ],
  exports: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
