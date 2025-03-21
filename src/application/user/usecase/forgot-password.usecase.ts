import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject } from '@nestjs/common';
import { TokenGeneratorInterfece } from '../providers/token-generator.interface';
import { ForgotPasswordRequestDto } from '../dtos/request/forgot-password.request.dto';

export class ForgotPasswordUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepositoryInterface,
    @Inject('TokenGenerator')
    private tokenGenerator: TokenGeneratorInterfece,
  ) {}

  async execute(forgotPasswordRequestDto: ForgotPasswordRequestDto): Promise<void> {
    const user = await this.userRepository.findOneByEmail(forgotPasswordRequestDto.email);
    console.log(await this.tokenGenerator.resetPasswordToken(user));
  }
}
