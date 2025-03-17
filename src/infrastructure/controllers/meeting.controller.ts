import { MeetingRequestDto } from '@application/meeting/dtos/request/meeting.request.dto';
import { CreateMeetingUsecase } from '@application/meeting/usecases/create-meeting.usecase';
import { CurrentUser } from '@infrastructure/decorators/current-user.decorator';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { User } from '@domain/entities/User';
import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RolesEnum } from '@domain/enums/roles.enum';
import { GetMeetingsUsecase } from '@application/meeting/usecases/get-meetings.usecase';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { MeetingResponseDto } from '@application/meeting/dtos/response/meeting.response.dto';
import { MeetingFilterDto } from '@application/meeting/dtos/filter/meeting.filter.dto';
import { UpdateMeetingUsecase } from '@application/meeting/usecases/update-meeting.usecase';
import { EntityOwnerGuard } from '@infrastructure/guards/entity-owner.guard';
import { MapEntity } from '@infrastructure/decorators/map-entity.decorator';
import { AppRequest } from '@infrastructure/requests/app-request';
import { Meeting } from '@domain/entities/Meeting';

@Controller('/users/meetings')
export class MeetingController {
  constructor(
    private readonly createMeetingUsecase: CreateMeetingUsecase,
    private readonly getMeetingsUsecase: GetMeetingsUsecase,
    private readonly updateMeetingUsecase: UpdateMeetingUsecase,
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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit details of the meeting' })
  @ApiBody({ type: MeetingRequestDto })
  @ApiParam({ name: 'id', description: 'Meeting ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Meeting was updated successfully',
    type: MeetingResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Only the host of the meeting can update the details of the meeting',
  })
  @Roles([RolesEnum.OWNER, RolesEnum.MANAGER, RolesEnum.EMPLOYEE])
  @MapEntity({ entityName: 'Meeting' })
  @UseGuards(EntityOwnerGuard)
  @Header('Content-Type', 'application/json')
  @Put('/:id')
  async updateMeeting(
    @Req() request: AppRequest,
    @Body(new ValidationPipe()) meetingRequestDto: MeetingRequestDto,
  ): Promise<MeetingResponseDto> {
    const meeting = request.entity as Meeting;

    return await this.updateMeetingUsecase.execute(meeting, meetingRequestDto);
  }
}
