import { MeetingRequestDto } from '@application/meeting/dtos/request/meeting.request.dto';
import { CreateMeetingUsecase } from '@application/meeting/usecases/create-meeting.usecase';
import { CurrentUser } from '@application/user/decorators/current-user.decorator';
import { Roles } from '@application/user/decorators/roles.decorator';
import { User } from '@domain/entities/User';
import { Body, Controller, Get, Header, HttpException, HttpStatus, Post, Query, ValidationPipe } from '@nestjs/common';
import { RolesEnum } from '@domain/enums/roles.enum';
import { GetMeetingsUsecase } from '@application/meeting/usecases/get-meetings.usecase';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MeetingResponseDto } from '@application/meeting/dtos/response/meeting.response.dto';
import { MeetingFilterDto } from '@application/meeting/dtos/filter/meeting.filter.dto';

@Controller('/users/meetings')
export class MeetingController {
  constructor(
    private readonly createMeetingUsecase: CreateMeetingUsecase,
    private readonly getMeetingsUsecase: GetMeetingsUsecase,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new meeting' })
  @ApiBody({ type: MeetingRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The meeting has been successfully created',
    type: MeetingResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Roles([RolesEnum.OWNER, RolesEnum.MANAGER, RolesEnum.EMPLOYEE])
  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    @Body(new ValidationPipe()) meetingRequestDto: MeetingRequestDto,
    @CurrentUser() user: User,
  ): Promise<MeetingResponseDto> {
    try {
      return await this.createMeetingUsecase.execute(meetingRequestDto, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user meetings' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All user meetings where returned',
    type: MeetingResponseDto,
  })
  @Roles([RolesEnum.OWNER, RolesEnum.MANAGER, RolesEnum.EMPLOYEE])
  @Get()
  @Header('Content-Type', 'application/json')
  async getMeetings(
    @Query() meetingFilterDto: MeetingFilterDto,
    @CurrentUser() user: User,
  ): Promise<MeetingResponseDto[]> {
    return await this.getMeetingsUsecase.execute(user, meetingFilterDto);
  }
}
