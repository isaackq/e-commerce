import {
  IsString,
  IsEmail,
  IsDate,
  IsMobilePhone,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsDate()
  @Type(() => Date)
  public birthday: Date | null;

  @IsMobilePhone()
  public mobileNumber: string | null;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    birthday: Date | null,
    mobileNumber: string | null,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.birthday = birthday;
    this.mobileNumber = mobileNumber;
  }
}
