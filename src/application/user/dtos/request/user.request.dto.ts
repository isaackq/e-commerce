import { IsString, IsEmail, IsDate, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsPassword } from '@infrastructure/decorators/is-password.decorator';

export class UserRequestDto {
  @ApiProperty({
    example: 'Hazem',
    description: 'The firstname of the User',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  public firstname: string;

  @ApiProperty({
    example: 'Hazem',
    description: 'The lastname of the User',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  public lastname: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the User',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the User',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsPassword()
  public password: string;

  @ApiProperty({
    example: '1999-12-13',
    description: 'The birthday of the User',
    required: false,
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  public birthday: Date | null;

  @ApiProperty({
    example: '0123456789',
    description: 'The mobile number of the User',
    required: false,
    type: String,
  })
  @IsMobilePhone()
  public mobileNumber: string | null;

  @ApiProperty({
    example: 'Palestine',
    description: 'The country address of the user',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    example: 'Jerusalem',
    description: 'The city address of the user',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'Palestiniane',
    description: 'The nationality the user',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  nationality: string;

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
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.birthday = birthday;
    this.mobileNumber = mobileNumber;
    this.country = country;
    this.city = city;
    this.nationality = nationality;
  }
}
