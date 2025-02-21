import { UserDocument } from '@infrastructure/schemas/user.schema';
import { User } from '@domain/entities/User';
import { Birthday } from '@domain/objectsValues/Birthday';

export class UserMapper {
  static map(userDocument: UserDocument | string): User {
    const user = new User();
    if (typeof userDocument === 'string') {
      user.id = userDocument;

      return user;
    }

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
