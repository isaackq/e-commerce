import { PaginatorRequestDto } from '@application/dtos/request/paginator.request.dto';
import { PaginatorResponseDto } from '@application/dtos/response/paginator.response.dto';
import { CurrentUser } from '@application/user/decorators/current-user.decorator';
import { Roles } from '@application/user/decorators/roles.decorator';
import { UserRequestDto } from '@application/user/dtos/request/user.request.dto';
import { UserResponseDto } from '@application/user/dtos/response/user.response.dto';
import { GetUsersUseCase } from '@application/user/usecase/get-users.usecase';
import { RegistrationUserUseCase } from '@application/user/usecase/registration-user.usecase';
import { User } from '@domain/entities/User';
import { RolesEnum } from '@domain/enums/roles.enum';
import { Body, Controller, Get, Header, HttpStatus, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';

@Controller()
export class UserController {
  constructor(
    private readonly registrationUsecase: RegistrationUserUseCase,
    private readonly getUsersUsecase: GetUsersUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'A user with email and/or mobileNumber already exists.' })
  @Post('/users')
  @Header('Content-Type', 'application/json')
  async create(@Body(new ValidationPipe()) userRequestDto: UserRequestDto): Promise<UserResponseDto> {
    return await this.registrationUsecase.execute(userRequestDto);
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
  @Get('/users')
  @Header('Content-Type', 'application/json')
  async getUsers(
    @Query() paginatorRequestDto: PaginatorRequestDto,
    @CurrentUser() user: User,
  ): Promise<PaginatorResponseDto<UserResponseDto>> {
    return await this.getUsersUsecase.execute(paginatorRequestDto.page, paginatorRequestDto.limit, user.role);
  }
}
