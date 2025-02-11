import { IsString, IsEmail, IsDate, IsMobilePhone, IsNotEmpty, IsStrongPassword, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Roles } from '@domain/enums/roles.enum';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  public firstname: string;

  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsStrongPassword({
    minLength: 5,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  @IsNotEmpty()
  public password: string;

  @IsDate()
  @Type(() => Date)
  public birthday: Date | null;

  @IsMobilePhone()
  public mobileNumber: string | null;

  @IsEnum(Roles)
  public role: Roles;

  constructor(firstname: string, lastname: string, email: string, birthday: Date | null, mobileNumber: string | null) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.birthday = birthday;
    this.mobileNumber = mobileNumber;
  }
}
