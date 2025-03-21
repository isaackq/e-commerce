import { ResetPasswordTokenGuard } from '@infrastructure/guards/reset-password-token.guard';
import { UserTransformer } from '@application/user/transformers/user.transformer';
import { ForgotPasswordUseCase } from '@application/user/usecase/forgot-password.usecase';
import { GetUsersUseCase } from '@application/user/usecase/get-users.usecase';
import { LoginUseCase } from '@application/user/usecase/login.usecase';
import { RefreshTokenUseCase } from '@application/user/usecase/refresh-token.usecase';
import { RegistrationUserUseCase } from '@application/user/usecase/registration-user.usecase';
import { ResetPasswordUseCase } from '@application/user/usecase/reset-password.usecase';
import { AuthController } from '@infrastructure/controllers/auth.controller';
import { ResetPasswordController } from '@infrastructure/controllers/reset-password.controller';
import { UserController } from '@infrastructure/controllers/user.controller';
import { BcryptHashingProvider } from '@infrastructure/providers/bcrypt.hashing.provider';
import { JwtTokenGenerator } from '@infrastructure/providers/jwt.token-generator.provider';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { User, UserSchema } from '@infrastructure/schemas/user.schema';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { IsPasswordValidator } from '@infrastructure/validators/is-password.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
  ],
  controllers: [UserController, AuthController, ResetPasswordController],
  providers: [
    RegistrationUserUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    UserTransformer,
    GetUsersUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    Connection,
    IsPasswordValidator,
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
  exports: [{ provide: 'UserRepository', useClass: UserRepository }],
})
export class UserModule {}
