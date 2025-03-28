import { UserRequestDto } from './user.request.dto';

export class OwnerRequestDto extends UserRequestDto {
  constructor(
    firstname: string,
    lastname: string,
    email: string,
    birthday: Date | null,
    mobileNumber: string | null,
    country: string,
    city: string,
    nationality: string,
  ) {
    super(firstname, lastname, email, birthday, mobileNumber, country, city, nationality);
  }
}
