import { ProjectRequestDto } from '@application/project/dtos/request/project.request.dto';
import { ProjectResponseDto } from '@application/project/dtos/response/project.response.dto';
import { CreateProjectUsecase } from '@application/project/usecase/create-project.usecase';
import { CurrentUser } from '@application/user/decorators/current-user.decorator';
import { Roles } from '@application/user/decorators/roles.decorator';
import { User } from '@domain/entities/User';
import { RolesEnum } from '@domain/enums/roles.enum';
import { Body, Controller, Header, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/projects')
export class ProjectController {
  constructor(private readonly createProjectUsecase: CreateProjectUsecase) {}

  @ApiOperation({ summary: 'Create a new project' })
  @ApiBearerAuth()
  @ApiBody({ type: ProjectRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The project has been successfully created',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Roles([RolesEnum.MANAGER])
  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    @Body(ValidationPipe) projectRequestDto: ProjectRequestDto,
    @CurrentUser() user: User,
  ): Promise<ProjectResponseDto> {
    return this.createProjectUsecase.execute(projectRequestDto, user);
  }
}
