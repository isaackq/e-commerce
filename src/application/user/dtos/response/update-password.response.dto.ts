import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordResponseDto {
  @ApiProperty({
    description: 'Message indicating the result of the password update operation',
    example: 'Password updated successfully',
    required: true,
    type: String,
  })
  message: string;

  private constructor(message: string) {
    this.message = message;
  }

  public static fromMessage(message: string) {
    const updatePasswordResponse = new UpdatePasswordResponseDto(message);
    return updatePasswordResponse;
  }
}
