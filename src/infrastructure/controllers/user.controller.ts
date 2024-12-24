import { UserDto } from '@application/dtos/user.dto';
import { RegistrationUserUseCase } from '@application/usecase/registration-user.usecase';
import { Body, Controller, Header, Post, ValidationPipe } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly registrationUsecase: RegistrationUserUseCase) {}

  @Post('/users')
  @Header('Content-Type', 'application/json')
  registration(@Body(new ValidationPipe()) userDto: UserDto): string {

    const user = this.registrationUsecase.execute(userDto);

    return JSON.stringify(user);
  }
}
