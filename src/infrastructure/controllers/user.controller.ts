import { PaginatorRequestDto } from '@application/dtos/request/paginator.request.dto';
import { PaginatorResponseDto } from '@application/dtos/response/paginator.response.dto';
import { CurrentUser } from '@infrastructure/decorators/current-user.decorator';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { UserResponseDto } from '@application/user/dtos/response/user.response.dto';
import { RegisterEmployeeUseCase } from '@application/user/usecase/register-employee.usecase';
import { GetUsersUseCase } from '@application/user/usecase/get-users.usecase';
import { User } from '@domain/entities/user/User';
import { RolesEnum } from '@domain/enums/roles.enum';
import { Body, Controller, Get, Header, HttpStatus, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { TypedEventEmitter } from '@infrastructure/providers/typed-event-emitter.provider';
import { UserRegisterationEvent } from '@infrastructure/events/user-registeration.event';
import { EmployeeRequestDto } from '@application/user/dtos/request/employee.request.dto';
import { EmployeeResponseDto } from '@application/user/dtos/response/employee.response.dto';
import { ManagerRequestDto } from '@application/user/dtos/request/manager.request.dto';
import { RegisterManagerUseCase } from '@application/user/usecase/register-manager.usecase';
import { RegisterOwnerUseCase } from '@application/user/usecase/register-owner.usecase';
import { ManagerResponseDto } from '@application/user/dtos/response/manager.response.dto';
import { OwnerRequestDto } from '@application/user/dtos/request/owner.request.dto';
import { OwnerResponseDto } from '@application/user/dtos/response/owner.response.dto';
import { GetUserDetailsUseCase } from '@application/user/usecase/get-user-details.usecase';
import { EntityByIdPipe } from '@infrastructure/pipes/entity-by-id.pipe';

@Controller('users')
export class UserController {
  constructor(
    private readonly registerEmployeeUseCase: RegisterEmployeeUseCase,
    private readonly registerManagerUseCase: RegisterManagerUseCase,
    private readonly registerOwnerUseCase: RegisterOwnerUseCase,
    private readonly getUsersUsecase: GetUsersUseCase,
    private readonly getUserDetailsUsecase: GetUserDetailsUseCase,
    private readonly eventEmitter: TypedEventEmitter,
  ) {}

  @ApiOperation({ summary: 'Add a new employee' })
  @ApiBody({ type: EmployeeRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The employee was added successfully.',
    type: EmployeeResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'A user with the same email and/or mobileNumber already exists.',
  })
  @Post('/employees')
  @Header('Content-Type', 'application/json')
  async createEmployee(
    @Body(new ValidationPipe()) employeeRequestDto: EmployeeRequestDto,
  ): Promise<EmployeeResponseDto> {
    const employee = await this.registerEmployeeUseCase.execute(employeeRequestDto);
    await this.eventEmitter.emit(
      'user.verify-email',
      new UserRegisterationEvent(employee.firstname, employee.email, employee.mobileNumber),
    );

    return employee;
  }

  @ApiOperation({ summary: 'Add a new manager' })
  @ApiBody({ type: ManagerRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The manager was added successfully.',
    type: UserResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'A user with the same email and/or mobileNumber already exists.',
  })
  @Post('/managers')
  @Header('Content-Type', 'application/json')
  async createManager(@Body(new ValidationPipe()) managerRequestDto: ManagerRequestDto): Promise<ManagerResponseDto> {
    const manager = await this.registerManagerUseCase.execute(managerRequestDto);
    await this.eventEmitter.emit(
      'user.verify-email',
      new UserRegisterationEvent(manager.firstname, manager.email, manager.mobileNumber),
    );

    return manager;
  }

  @ApiOperation({ summary: 'Add a new owner' })
  @ApiBody({ type: OwnerRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The owner was added successfully.',
    type: UserResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'A user with the same email and/or mobileNumber already exists.',
  })
  @Post('/owners')
  @Header('Content-Type', 'application/json')
  async createOwner(@Body(new ValidationPipe()) ownerRequestDto: OwnerRequestDto): Promise<OwnerResponseDto> {
    const owner = await this.registerOwnerUseCase.execute(ownerRequestDto);
    await this.eventEmitter.emit(
      'user.verify-email',
      new UserRegisterationEvent(owner.firstname, owner.email, owner.mobileNumber),
    );

    return owner;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a paginated list of users',
    schema: {
      allOf: [
        {
          properties: {
            page: { type: 'number', example: 1 },
            total: { type: 'number', example: 100 },
            limit: { type: 'number', example: 10 },
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(UserResponseDto) },
            },
          },
        },
      ],
    },
  })
  @Roles([RolesEnum.OWNER, RolesEnum.MANAGER])
  @Get()
  @Header('Content-Type', 'application/json')
  async getUsers(
    @Query() paginatorRequestDto: PaginatorRequestDto,
    @CurrentUser() user: User,
  ): Promise<PaginatorResponseDto<UserResponseDto>> {
    return await this.getUsersUsecase.execute(paginatorRequestDto.page, paginatorRequestDto.limit, user.getRole());
  }

  @ApiOperation({ summary: 'Get details for the current user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User details were retrieved successfully' })
  @ApiBearerAuth()
  @Roles([RolesEnum.EMPLOYEE, RolesEnum.MANAGER, RolesEnum.OWNER])
  @Get('/me')
  @Header('Content-Type', 'application/json')
  async getMy(@CurrentUser() user: User): Promise<UserResponseDto> {
    return await this.getUserDetailsUsecase.execute(user);
  }

  @ApiOperation({ summary: 'Get details on a specific user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User details were retrieved successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'You are not allowed to see the details of this user' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'No user with this id exists' })
  @ApiBearerAuth()
  @Roles([RolesEnum.OWNER])
  @Get('/:id')
  @Header('Content-Type', 'application/json')
  async getUserDetails(@Param('id', EntityByIdPipe('User')) user: User): Promise<UserResponseDto> {
    return await this.getUserDetailsUsecase.execute(user);
  }
}
