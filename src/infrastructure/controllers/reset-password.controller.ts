import { ForgotPasswordRequestDto } from '@application/user/dtos/request/forgot-password.request.dto';
import { ResetPasswordRequestDto } from '@application/user/dtos/request/reset-password.request.dto';
import { ForgotPasswordUseCase } from '@application/user/usecase/forgot-password.usecase';
import { ResetPasswordUseCase } from '@application/user/usecase/reset-password.usecase';
import { ResetPasswordTokenGuard } from '@infrastructure/guards/reset-password-token.guard';
import { AppRequest } from '@infrastructure/requests/app-request';
import { Body, Controller, Header, HttpCode, HttpStatus, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller()
export class ResetPasswordController {
  constructor(
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @ApiOperation({ summary: 'Request a reset password token when you forget your password' })
  @ApiBody({ type: ForgotPasswordRequestDto })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'If the request is successful, you will receive an email with instructions to reset your password.',
  })
  @Post('/users/forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  async forgotPassword(@Body(new ValidationPipe()) forgotPasswordRequestDto: ForgotPasswordRequestDto): Promise<void> {
    try {
      await this.forgotPasswordUseCase.execute(forgotPasswordRequestDto);
    } catch {}
  }

  @ApiOperation({ summary: 'Reset password' })
  @ApiBody({ type: ResetPasswordRequestDto })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Password was reset successfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'No user with this email exists' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You need a valid token to be able to reset your password',
  })
  @Post('/users/reset-password')
  @ApiQuery({ name: 'token', description: 'JWT token' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ResetPasswordTokenGuard)
  @Header('Content-Type', 'application/json')
  async resetPassword(
    @Body(new ValidationPipe()) resetPasswordRequestDto: ResetPasswordRequestDto,
    @Req() request: AppRequest,
  ): Promise<void> {
    await this.resetPasswordUseCase.execute(resetPasswordRequestDto, request.user);
  }
}
