import { IsString, IsEmail, IsDate, IsMobilePhone, IsNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { RolesEnum } from '@domain/enums/roles.enum';
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
    example: 'employee',
    description: 'The role of the User',
    required: false,
    enum: [RolesEnum.EMPLOYEE, RolesEnum.MANAGER],
  })
  @IsEnum(RolesEnum)
  public role: RolesEnum;

  constructor(firstname: string, lastname: string, email: string, birthday: Date | null, mobileNumber: string | null) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.birthday = birthday;
    this.mobileNumber = mobileNumber;
  }
}
