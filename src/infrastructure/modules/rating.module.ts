import { EditRatingUsecase } from '@application/rating/usecase/edit-rating.usecase';
import { GetProjectRatingsUsecase } from '@application/rating/usecase/get-project-ratings.usecase';
import { RatingTransformer } from '@application/transformer/rating.transformer';
import { RatingController } from '@infrastructure/controllers/ratting.controller';
import { RatingRepository } from '@infrastructure/repositories/rating.repository';
import { Rating, RatingSchema } from '@infrastructure/schemas/rating.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user.module';
import { User, UserSchema } from '@infrastructure/schemas/user.schema';
import { GetEmployeeRatingsUsecase } from '@application/rating/usecase/get-employee-ratings.usecase';
import { ProjectModule } from './project.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rating.name, schema: RatingSchema },
      { name: User.name, schema: UserSchema },
    ]),
    UserModule,
    ProjectModule,
  ],
  controllers: [RatingController],
  providers: [
    GetProjectRatingsUsecase,
    GetEmployeeRatingsUsecase,
    EditRatingUsecase,
    RatingTransformer,
    {
      provide: 'RatingRepository',
      useClass: RatingRepository,
    },
  ],
  exports: [
    {
      provide: 'RatingRepository',
      useClass: RatingRepository,
    },
  ],
})
export class RatingModule {}
