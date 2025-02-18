import { MessageRequestDto } from '@application/message/dtos/request/message.request.dto';
import { ObjectIdValidationPipe } from '@application/pipes/object-id-validation.pipe';
import { CreateMessageUseCase } from '@application/message/usecase/send-message-to-support.usecase';
import { Body, Controller, Get, Header, HttpException, HttpStatus, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetMessageUseCase } from '@application/message/usecase/get-message.usecase';
import { CurrentUser } from '@application/user/decorators/current-user.decorator';
import { User } from '@domain/entities/User';
import { MessageResponseDto } from '@application/message/dtos/response/message.response.dto';
import { Roles } from '@application/user/decorators/roles.decorator';
import { RolesEnum } from '@domain/enums/roles.enum';

@Controller('/messages')
export class MessageController {
  constructor(
    private readonly createMessageUseCase: CreateMessageUseCase,
    private readonly getMessageUsecase: GetMessageUseCase,
  ) {}

  @ApiOperation({ summary: 'Get a message' })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, description: 'Return a message', type: MessageResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'You are not allowed to read this message' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'This message is not found' })
  @Roles([RolesEnum.MANAGER, RolesEnum.EMPLOYEE, RolesEnum.OWNER])
  @Get('/:id')
  async getMessage(@Param('id', ObjectIdValidationPipe) id: string, @CurrentUser() user: User) {
    try {
      return await this.getMessageUsecase.execute(id, user);
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
