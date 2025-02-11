import { User } from '@domain/entities/User';
import { Token } from '../interfaces/token.interface';

export interface TokenGeneratorInterfece {
  generateTokens(user: User): Promise<Token>;
  refreshToken(refreshToken: string): Promise<Pick<Token, 'accessToken'>>;
}
