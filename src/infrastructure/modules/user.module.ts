import { UserTransformer } from '@application/user/transformers/user.transformer';
import { GetUsersUseCase } from '@application/user/usecase/get-users.usecase';
import { LoginUseCase } from '@application/user/usecase/login.usecase';
import { RefreshTokenUseCase } from '@application/user/usecase/refresh-token.usecase';
import { RegistrationUserUseCase } from '@application/user/usecase/registration-user.usecase';
import { AuthController } from '@infrastructure/controllers/auth.controller';
import { UserController } from '@infrastructure/controllers/user.controller';
import { BcryptHashingProvider } from '@infrastructure/providers/bcrypt.hashing.provider';
import { JwtTokenGenerator } from '@infrastructure/providers/jwt.token-generator.provider';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { User, UserSchema } from '@infrastructure/schemas/user.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import jwtConfig from 'config/jwt.config';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
  ],
  controllers: [UserController, AuthController],
  providers: [
    RegistrationUserUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    UserTransformer,
    GetUsersUseCase,
    Connection,
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
  ],
  exports: [{ provide: 'UserRepository', useClass: UserRepository }],
})
export class UserModule {}
