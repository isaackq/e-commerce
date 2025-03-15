import { Rating } from '@domain/entities/Rating';
import { RatingDocument } from '@infrastructure/schemas/rating.schema';
import { Project } from '@domain/entities/Project';
import { User } from '@domain/entities/User';

export class RatingMapper {
  static map(ratingDocument: RatingDocument | string): Rating {
    const rating = new Rating();
    if (typeof ratingDocument === 'string') {
      rating.id = ratingDocument;

      return rating;
    }

    const project = new Project();
    project.id = ratingDocument.project.toString();

    const employee = new User();
    employee.id = ratingDocument.employee.toString();

    rating.project = project;
    rating.employee = employee;
    rating.value = ratingDocument.value;
    rating.createdAt = ratingDocument.createdAt;
    rating.id = ratingDocument.id.toString();

    return rating;
  }
}
