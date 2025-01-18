import { UserDto } from '@application/dtos/user.dto';
import { RegistrationUserUseCase } from '@application/usecase/registration-user.usecase';
import { Body, Controller, Get, Header, Post, ValidationPipe } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly registrationUsecase: RegistrationUserUseCase) {}

  @Post('/users')
  @Header('Content-Type', 'application/json')
  async registration(
    @Body(new ValidationPipe()) userDto: UserDto,
  ): Promise<string> {
    const user = await this.registrationUsecase.execute(userDto);

    return JSON.stringify(user);
  }
  @Get('/users')
  getUsers(): string {
    return 'Get all users';
  }
}
