import { MessageRequestDto } from '@application/message/dtos/request/message.request.dto';
import { CreateMessageUseCase } from '@application/message/usecase/create-message.usecase';
import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GetMessageUseCase } from '@application/message/usecase/get-message.usecase';
import { CurrentUser } from '@infrastructure/decorators/current-user.decorator';
import { User } from '@domain/entities/User';
import { MessageResponseDto } from '@application/message/dtos/response/message.response.dto';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { RolesEnum } from '@domain/enums/roles.enum';
import { Message } from '@domain/entities/Message';
import { MapEntity } from '@infrastructure/decorators/map-entity.decorator';
import { EntityOwnerGuard } from '@infrastructure/guards/entity-owner.guard';
import { AppRequest } from '@infrastructure/requests/app-request';

@Controller('/messages')
export class MessageController {
  constructor(
    private readonly createMessageUseCase: CreateMessageUseCase,
    private readonly getMessageUsecase: GetMessageUseCase,
  ) {}

  @ApiOperation({ summary: 'Get a message' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Message ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return a message', type: MessageResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'You are not allowed to read this message' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'This message is not found' })
  @Roles([RolesEnum.MANAGER, RolesEnum.EMPLOYEE, RolesEnum.OWNER])
  @MapEntity({ entityName: 'Message', authorizeOwner: true })
  @UseGuards(EntityOwnerGuard)
  @Get('/:id')
  async getMessage(@Req() request: AppRequest) {
    try {
      const message = request.entity as Message;

      return await this.getMessageUsecase.execute(message);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Send a message to support' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The message has been successfully sent',
    type: MessageResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'You are not allowed to send message' })
  @Roles([RolesEnum.MANAGER, RolesEnum.EMPLOYEE])
  @Post()
  @Header('Content-Type', 'application/json')
  async createMessage(
    @Body(new ValidationPipe()) messageRequestDto: MessageRequestDto,
    @CurrentUser() user: User,
  ): Promise<MessageResponseDto> {
    try {
      return await this.createMessageUseCase.execute(messageRequestDto, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
