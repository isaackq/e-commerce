import { User } from '@domain/entities/user/User';
import { RolesEnum } from '@domain/enums/roles.enum';
import { Birthday } from '@domain/objectsValues/Birthday';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: '343654364351354',
    description: 'The id of the User',
    type: String,
  })
  public id: string;

  @ApiProperty({
    example: 'Hazem',
    description: 'The firstname of the User',
    type: String,
  })
  public firstname: string;

  @ApiProperty({
    example: 'Hazem',
    description: 'The lastname of the User',
    type: String,
  })
  public lastname: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the User',
    type: String,
  })
  public email: string;

  @ApiProperty({
    example: '1999-12-13',
    description: 'The birthday of the User',
    type: Date,
  })
  public birthday: Date | null;

  @ApiProperty({
    example: '0123456789',
    description: 'The mobile number of the User',
    type: String,
  })
  public mobileNumber: string | null;

  @ApiProperty({
    example: 'employee',
    description: 'The role of the User',
    enum: RolesEnum,
  })
  public role: RolesEnum;

  @ApiProperty({
    example: 'Palestine',
    description: 'Country of the address',
    type: String,
  })
  public country: string;

  @ApiProperty({
    example: 'Gaza',
    description: 'City of the address',
    type: String,
  })
  public city: string;

  @ApiProperty({
    example: 'Palestinian',
    description: 'Nationality of the user',
    type: String,
  })
  public nationality: string;

  constructor(
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    birthday: Birthday | Date,
    mobileNumber: string,
    role: RolesEnum,
    country: string,
    city: string,
    nationality: string,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.birthday = birthday instanceof Birthday ? birthday.value : birthday;
    this.mobileNumber = mobileNumber;
    this.role = role;
    this.country = country;
    this.city = city;
    this.nationality = nationality;
  }

  public static createFromEntity(user: User): UserResponseDto {
    return new UserResponseDto(
      user.id,
      user.firstname,
      user.lastname,
      user.email,
      user.birthday,
      user.mobileNumber,
      user.getRole(),
      user.country,
      user.city,
      user.nationality,
    );
  }
}
