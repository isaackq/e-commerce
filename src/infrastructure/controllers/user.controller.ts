import { PaginatorDto } from '@application/dtos/request/paginator.dto';
import { Paginator } from '@application/dtos/response/paginator.dto';
import { CurrentUser } from '@application/user/decorators/current-user.decorator';
import { Roles } from '@application/user/decorators/roles.decorator';
import { UserDto } from '@application/user/dtos/user.dto';
import { GetUsersUseCase } from '@application/user/usecase/get-users.usecase';
import { RegistrationUserUseCase } from '@application/user/usecase/registration-user.usecase';
import { User } from '@domain/entities/User';
import { Roles as RolesEnum } from '@domain/enums/roles.enum';
import { Body, Controller, Get, Header, HttpStatus, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller()
export class UserController {
  constructor(
    private readonly registrationUsecase: RegistrationUserUseCase,
    private readonly getUsersUsecase: GetUsersUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully created', type: Object })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'A user with email and/or mobileNumber already exists.' })
  @Post('/users')
  @Header('Content-Type', 'application/json')
  async create(@Body(new ValidationPipe()) userDto: UserDto): Promise<User> {
    return await this.registrationUsecase.execute(userDto);
  }

  @Get('/users')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all users', type: UserDto, isArray: true })
  @Roles([RolesEnum.OWNER, RolesEnum.MANAGER])
  @Get('/users')
  @Header('Content-Type', 'application/json')
  async getUsers(@Query() paginatorDto: PaginatorDto, @CurrentUser() user: User): Promise<Paginator<Partial<User>>> {
    return await this.getUsersUsecase.execute(paginatorDto.page, paginatorDto.limit, user.role);
  }
}
