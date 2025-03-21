import { IsPassword } from '@infrastructure/decorators/is-password.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordRequestDto {
  @ApiProperty({
    example: 'password',
    description: 'The new password for the User',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsPassword()
  public password: string;

  constructor(password: string) {
    this.password = password;
  }
}
