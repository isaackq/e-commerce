import { Rating } from '@domain/entities/Rating';
import { RatingDocument } from '@infrastructure/schemas/rating.schema';
import { ProjectMapper } from './project.mapper';
import { UserMapper } from './user.mapper';
import { Employee } from '@domain/entities/user/Employee';

export class RatingMapper {
  static map(ratingDocument: RatingDocument | string): Rating {
    const rating = new Rating();
    if (typeof ratingDocument === 'string') {
      rating.id = ratingDocument;

      return rating;
    }

    rating.id = ratingDocument.id.toString();
    rating.value = ratingDocument.value;
    rating.createdAt = ratingDocument.createdAt;
    rating.project = ProjectMapper.map(ratingDocument.project as any);
    rating.employee = UserMapper.map(ratingDocument.employee as any) as Employee;

    return rating;
  }
}
