import { Token } from '@application/user/dtos/response/token.dto';
import { TokenGeneratorInterfece } from '@application/user/providers/token-generator.interface';
import { User } from '@domain/entities/User';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'config/jwt.config';

@Injectable()
export class JwtTokenGenerator implements TokenGeneratorInterfece {
  constructor(
    private jwtService: JwtService,
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  public async generateTokens(user: User): Promise<Token> {
    const [accessToken, refreshToken] = await Promise.all([
      await this.generateToken(user.id, this.jwtConfiguration.accessTokenTtl, { email: user.email, role: user.role }),
      await this.generateToken(user.id, this.jwtConfiguration.refreshTokenTtl),
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
        accessToken: await this.generateToken(user.id, this.jwtConfiguration.accessTokenTtl, {
          email: user.email,
          role: user.role,
        }),
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async resetPasswordToken(user: User): Promise<string> {
    return await this.generateToken(user.id, this.jwtConfiguration.resetPasswordTokenTtl, { email: user.email });
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
