import { PositionRequestDto } from '@application/position/dtos/request/position.request.dto';
import { PositionResponseDto } from '@application/position/dtos/response/position.response.dto';
import { CreatePositionUsecase } from '@application/position/usecase/create-position.usecase';
import { GetPositionsUsecase } from '@application/position/usecase/get-positions.usecase';
import { UpdatePositionUseCase } from '@application/position/usecase/update-position.usecase';
import { RolesEnum } from '@domain/enums/roles.enum';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { Body, Controller, Get, Header, HttpStatus, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/positions')
export class PositionController {
  constructor(
    private readonly createPositionUsecase: CreatePositionUsecase,
    private readonly getPositionsUseCase: GetPositionsUsecase,
    private readonly updatePositionUsecase: UpdatePositionUseCase,
  ) {}

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

  @ApiOperation({ summary: 'Get all positions' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all positions',
    type: [PositionResponseDto],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Roles([RolesEnum.OWNER, RolesEnum.MANAGER, RolesEnum.EMPLOYEE])
  @Get()
  @Header('Content-Type', 'application/json')
  async getAll(): Promise<PositionResponseDto[]> {
    return this.getPositionsUseCase.execute();
  }

  @ApiOperation({ summary: 'Update existing postion' })
  @ApiBearerAuth()
  @ApiBody({ type: PositionRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Position Updated',
    type: [PositionResponseDto],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Position not found' })
  @Roles([RolesEnum.OWNER])
  @Put('/:id')
  @Header('Content-Type', 'application/json')
  async update(
    @Body(ValidationPipe) positionRequestDto: PositionRequestDto,
    @Param('id') id: string,
  ): Promise<PositionResponseDto> {
    return await this.updatePositionUsecase.execute(id, positionRequestDto);
  }
}
