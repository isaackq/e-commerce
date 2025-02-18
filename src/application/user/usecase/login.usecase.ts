import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dtos/request/sign-in.dto';
import { HashingProviderInterface } from '../providers/hashing.provider.interface';
import { TokenGeneratorInterfece } from '../providers/token-generator.interface';
import { Token } from '../dtos/response/token.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('HashingProvider')
    private hashingProvider: HashingProviderInterface,
    @Inject('TokenGenerator')
    private tokenGenerator: TokenGeneratorInterfece,
  ) {}

  async execute(signInDto: SignInDto): Promise<Token> {
    const user = await this.userRepository.findOneByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const isEqual = await this.hashingProvider.compare(signInDto.password, user.password);

    if (!isEqual) {
      throw new UnauthorizedException('User does not exist');
    }

    return this.tokenGenerator.generateTokens(user);
  }
}
