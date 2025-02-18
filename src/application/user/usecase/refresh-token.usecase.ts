import { Inject, Injectable } from '@nestjs/common';
import { TokenGeneratorInterfece } from '../providers/token-generator.interface';
import { Token } from '../dtos/response/token.dto';
import { RefreshTokenDto } from '../dtos/request/refresh-token.dto';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject('TokenGenerator')
    private tokenGenerator: TokenGeneratorInterfece,
  ) {}

  async execute(refreshTokenDto: RefreshTokenDto): Promise<Pick<Token, 'accessToken'>> {
    return this.tokenGenerator.refreshToken(refreshTokenDto.refreshToken);
  }
}
