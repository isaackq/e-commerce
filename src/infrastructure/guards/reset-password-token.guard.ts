import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ResetPasswordTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.query.token;

    if (!token) {
      throw new UnauthorizedException('You need a valid token to reset this password');
    }

    const payload = await this.jwtService.verifyAsync(token);
    const user = await this.userRepository.findOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = user;

    return true;
  }
}
