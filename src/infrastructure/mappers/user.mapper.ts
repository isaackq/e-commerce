import { UserDocument } from '@infrastructure/schemas/user.schema';
import { User } from '@domain/entities/User';
import { Birthday } from '@domain/objectsValues/Birthday';

export class UserMapper {
  static map(userDocument: UserDocument): User {
    const user = new User();
    user.id = userDocument.id;
    user.password = userDocument.password;
    user.firstname = userDocument.firstname;
    user.lastname = userDocument.lastname;
    user.role = userDocument.role;
    user.birthday = new Birthday(userDocument.birthday);
    user.mobileNumber = userDocument.mobileNumber;
    user.email = userDocument.email;

    return user;
  }
}
