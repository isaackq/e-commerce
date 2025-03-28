import { User } from '@domain/entities/user/User';
import { Token } from '../dtos/response/token.dto';

export interface TokenGeneratorInterfece {
  generateTokens(user: User): Promise<Token>;
  refreshToken(refreshToken: string): Promise<Pick<Token, 'accessToken'>>;
  resetPasswordToken(user: User): Promise<string>;
}
