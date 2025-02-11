import { CurrentUser } from '@application/user/decorators/current-user.decorator';
import { Roles } from '@application/user/decorators/roles.decorator';
import { UserDto } from '@application/user/dtos/user.dto';
import { GetUsersUseCase } from '@application/user/usecase/get-users.usecase';
import { RegistrationUserUseCase } from '@application/user/usecase/registration-user.usecase';
import { User } from '@domain/entities/User';
import { Roles as RolesEnum } from '@domain/enums/roles.enum';
import { Body, Controller, Get, Header, Post, ValidationPipe } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(
    private readonly registrationUsecase: RegistrationUserUseCase,
    private readonly getUsersUsecase: GetUsersUseCase,
  ) {}

  @Post('/users')
  @Header('Content-Type', 'application/json')
  async create(@Body(new ValidationPipe()) userDto: UserDto): Promise<string> {
    const user = await this.registrationUsecase.execute(userDto);

    return JSON.stringify(user);
  }

  @Roles([RolesEnum.OWNER, RolesEnum.MANAGER])
  @Get('/users')
  @Header('Content-Type', 'application/json')
  async getUsers(@CurrentUser() user: User): Promise<string> {
    const users = await this.getUsersUsecase.execute(user.role);

    return JSON.stringify(users);
  }
}
