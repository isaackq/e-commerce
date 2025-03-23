import { RefreshTokenDto } from '@application/user/dtos/request/refresh-token.dto';
import { SignInDto } from '@application/user/dtos/request/sign-in.dto';
import { Token } from '@application/user/dtos/response/token.dto';
import { LoginUseCase } from '@application/user/usecase/login.usecase';
import { RefreshTokenUseCase } from '@application/user/usecase/refresh-token.usecase';
import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'User successfully logged in', type: Token })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async login(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<Token> {
    try {
      return await this.loginUseCase.execute(signInDto);
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'New access token issued', type: Token })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid or expired refresh token' })
  @Post('/refresh-token')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async refreshToken(
    @Body(new ValidationPipe()) refreshTokenDto: RefreshTokenDto,
  ): Promise<Pick<Token, 'accessToken'>> {
    try {
      return await this.refreshTokenUseCase.execute(refreshTokenDto);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
