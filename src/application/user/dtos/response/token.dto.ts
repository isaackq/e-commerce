import { ApiProperty } from '@nestjs/swagger';

export class Token {
  @ApiProperty({ description: 'JWT access token', example: 'eyJhbGciOiJIUz...' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token', example: 'eyJhbGciOiJIUz...' })
  refreshToken: string;
}
