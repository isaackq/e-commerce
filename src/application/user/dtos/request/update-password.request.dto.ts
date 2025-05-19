import { IsPassword } from '@infrastructure/decorators/is-password.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordRequestDto {
  @ApiProperty({
    description: 'Current password of the user',
    example: 'OldPassword123!',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsPassword()
  oldPassword: string;

  @ApiProperty({
    description: 'New password for the user',
    example: 'NewPassword456!',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsPassword()
  newPassword: string;
}
