import { IsString, IsEmail, IsDate, IsMobilePhone, IsNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { RolesEnum } from '@domain/enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@domain/entities/User';

export class UserResponseDto {
  @ApiProperty({
    example: '343654364351354',
    description: 'The id of the User',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public id: string;

  @ApiProperty({
    example: 'Hazem',
    description: 'The firstname of the User',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public firstname: string;

  @ApiProperty({
    example: 'Hazem',
    description: 'The lastname of the User',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the User',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

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

  public static createFromEntity(user: User): UserResponseDto {
    const userResponse = new UserResponseDto();
    userResponse.birthday = user.birthday.value;
    userResponse.email = user.email;
    userResponse.firstname = user.firstname;
    userResponse.lastname = user.lastname;
    userResponse.mobileNumber = user.mobileNumber;
    userResponse.role = user.role;

    return userResponse;
  }
}
