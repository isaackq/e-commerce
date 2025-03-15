import { PositionRequestDto } from '@application/position/dtos/request/position.request.dto';
import { PositionResponseDto } from '@application/position/dtos/response/project.response.dto';
import { CreatePositionUsecase } from '@application/position/usecase/create-position.usecase';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { RolesEnum } from '@domain/enums/roles.enum';
import { Body, Controller, Header, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/positions')
export class PositionController {
  constructor(private readonly createPositionUsecase: CreatePositionUsecase) {}

  @ApiOperation({ summary: 'Create a new position' })
  @ApiBearerAuth()
  @ApiBody({ type: PositionRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The position has been successfully created',
    type: PositionResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Roles([RolesEnum.OWNER])
  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body(ValidationPipe) positionRequestDto: PositionRequestDto): Promise<PositionResponseDto> {
    return this.createPositionUsecase.execute(positionRequestDto);
  }
}
