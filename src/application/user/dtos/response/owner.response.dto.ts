import { Birthday } from '@domain/objectsValues/Birthday';
import { Owner } from '@domain/entities/user/Owner';
import { RolesEnum } from '@domain/enums/roles.enum';
import { UserResponseDto } from './user.response.dto';

export class OwnerResponseDto extends UserResponseDto {
  private constructor(
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    birthday: Birthday | Date,
    mobileNumber: string,
    country: string,
    city: string,
    nationality: string,
  ) {
    super(id, firstname, lastname, email, birthday, mobileNumber, RolesEnum.OWNER, country, city, nationality);
  }

  public static createFromEntity(owner: Owner): OwnerResponseDto {
    const ownerResponse = new OwnerResponseDto(
      owner.id,
      owner.firstname,
      owner.lastname,
      owner.email,
      owner.birthday,
      owner.mobileNumber,
      owner.country,
      owner.city,
      owner.nationality,
    );

    return ownerResponse;
  }
}
