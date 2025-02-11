import { RefreshTokenDto } from '@application/user/dtos/refresh-token.dto';
import { SignInDto } from '@application/user/dtos/sign-in.dto';
import { Token } from '@application/user/interfaces/token.interface';
import { LoginUseCase } from '@application/user/usecase/login.usecase';
import { RefreshTokenUseCase } from '@application/user/usecase/refresh-token.usecase';
import { Body, Controller, Header, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async login(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<Token> {
    return await this.loginUseCase.execute(signInDto);
  }

  @Post('/refresh-token')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async refreshToken(
    @Body(new ValidationPipe()) refreshTokenDto: RefreshTokenDto,
  ): Promise<Pick<Token, 'accessToken'>> {
    return await this.refreshTokenUseCase.execute(refreshTokenDto);
  }
}
