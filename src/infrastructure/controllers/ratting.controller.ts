import { Controller, Get, Put, Body, HttpStatus, UseGuards, HttpException, Req } from '@nestjs/common';
import { RolesEnum } from '@domain/enums/roles.enum';
import { GetProjectRatingsUsecase } from '@application/rating/usecase/get-project-ratings.usecase';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { RatingRequestDto } from '@application/rating/dtos/request/rating.request.dto';
import { EditRatingUsecase } from '@application/rating/usecase/edit-rating.usecase';
import { RatingResponseDto } from '@application/rating/dtos/response/rating.response.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from '@infrastructure/decorators/current-user.decorator';
import { User } from '@domain/entities/user/User';
import { GetEmployeeRatingsUsecase } from '@application/rating/usecase/get-employee-ratings.usecase';
import { AppRequest } from '@infrastructure/requests/app-request';
import { Project } from '@domain/entities/Project';
import { MapEntity } from '@infrastructure/decorators/map-entity.decorator';
import { EntityOwnerGuard } from '@infrastructure/guards/entity-owner.guard';

@Controller()
export class RatingController {
  constructor(
    private readonly getEmployeeRatingsUsecase: GetEmployeeRatingsUsecase,
    private readonly getProjectRatingsUsecase: GetProjectRatingsUsecase,
    private readonly editRatingUsecase: EditRatingUsecase,
  ) {}

  @ApiOperation({ summary: 'Edit a rating' })
  @ApiBearerAuth()
  @ApiBody({ type: RatingRequestDto })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The rating has been successfully edited' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'You are not allowed to access this rating' })
  @Roles([RolesEnum.MANAGER, RolesEnum.OWNER])
  @UseGuards(EntityOwnerGuard)
  @MapEntity({ entityName: 'Project', paramName: 'projectId', source: 'body' })
  @Put('/ratings')
  async editRating(@Req() request: AppRequest, @Body() ratingRequestDto: RatingRequestDto): Promise<void> {
    try {
      const project = request.entity as Project;

      await this.editRatingUsecase.execute(project, ratingRequestDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get project ratings' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of ratings for the given project',
    type: [RatingResponseDto],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid project ID' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'You are not allowed to access this project' })
  @Roles([RolesEnum.MANAGER, RolesEnum.OWNER])
  @UseGuards(EntityOwnerGuard)
  @MapEntity({ entityName: 'Project' })
  @Get('projects/:id/ratings')
  async getProjectRatings(@Req() request: AppRequest): Promise<RatingResponseDto[]> {
    try {
      const project = request.entity as Project;

      return await this.getProjectRatingsUsecase.execute(project);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get employee ratings' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of ratings for the logged-in employee',
    type: [RatingResponseDto],
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized access' })
  @Roles([RolesEnum.EMPLOYEE])
  @Get('employees/ratings')
  async getEmployeeRatings(@CurrentUser() user: User): Promise<RatingResponseDto[]> {
    try {
      return await this.getEmployeeRatingsUsecase.execute(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
