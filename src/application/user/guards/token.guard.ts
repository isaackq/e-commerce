import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Roles } from '../decorators/roles.decorator';
import { UserRepository } from '@infrastructure/repositories/user.repository';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromRequest(request);

      if (!token) {
        throw new UnauthorizedException();
      }

      const payload = await this.jwtService.verifyAsync(token);
      const user = this.userRepository.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException();
      }

      request.user = user;

      if (!roles.includes(payload.role)) {
        return false;
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromRequest(request: Request): string {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];

    return token;
  }
}
