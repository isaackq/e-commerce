import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordRequestDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the user who forgot the password',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  constructor(email: string) {
    this.email = email;
  }
}
