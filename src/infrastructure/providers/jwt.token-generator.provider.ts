import { Token } from '@application/user/dtos/response/token.dto';
import { TokenGeneratorInterfece } from '@application/user/providers/token-generator.interface';
import { User } from '@domain/entities/User';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenGenerator implements TokenGeneratorInterfece {
  constructor(
    private jwtService: JwtService,
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}
  public async generateTokens(user: User): Promise<Token> {
    const [accessToken, refreshToken] = await Promise.all([
      await this.generateToken(user.id, 3600, { email: user.email, role: user.role }),
      await this.generateToken(user.id, 86400),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  public async refreshToken(refreshToken: string): Promise<Pick<Token, 'accessToken'>> {
    try {
      const { sub } = this.jwtService.verify(refreshToken);

      const user = await this.userRepository.findOne(sub);

      return {
        accessToken: await this.generateToken(user.id, 3600, {
          email: user.email,
          role: user.role,
        }),
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  private async generateToken<T>(sub: string, expiresIn: number, payload?: T): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: sub,
        ...payload,
      },
      {
        expiresIn: expiresIn,
      },
    );
  }
}
