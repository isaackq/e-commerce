import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  public refreshToken: string;
}
