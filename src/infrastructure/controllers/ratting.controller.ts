import { Controller, Get, Put, Body, Param, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
import { RolesEnum } from '@domain/enums/roles.enum';
import { GetProjectRatingsUsecase } from '@application/rating/usecase/get-project-ratings.usecase';
import { Roles } from '@application/user/decorators/roles.decorator';
import { RatingRequestDto } from '@application/rating/dtos/request/rating.request.dto';
import { EditRatingUsecase } from '@application/rating/usecase/edit-rating.usecase';
import { RatingResponseDto } from '@application/rating/dtos/response/rating.response.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectManagerGuard } from '@application/user/guards/project-manager.guard';
import { CurrentUser } from '@application/user/decorators/current-user.decorator';
import { User } from '@domain/entities/User';
import { GetEmployeeRatingsUsecase } from '@application/rating/usecase/get-employee-ratings.usecase';
import { ObjectIdValidationPipe } from '@application/pipes/object-id-validation.pipe';

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
  @Roles([RolesEnum.MANAGER])
  @UseGuards(ProjectManagerGuard)
  @Put('/ratings')
  async editRating(@Body() ratingRequestDto: RatingRequestDto): Promise<void> {
    await this.editRatingUsecase.execute(ratingRequestDto);
    try {
      await this.editRatingUsecase.execute(ratingRequestDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get project ratings' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of ratings for the given project',
    type: [RatingResponseDto],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid project ID' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'You are not allowed to access this project' })
  @Roles([RolesEnum.MANAGER])
  @Get('projects/:id/ratings')
  async getProjectRatings(@Param('id', ObjectIdValidationPipe) projectId: string): Promise<RatingResponseDto[]> {
    try {
      return await this.getProjectRatingsUsecase.execute(projectId);
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
      return await this.getEmployeeRatingsUsecase.execute(user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
