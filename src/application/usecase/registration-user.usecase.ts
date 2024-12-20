import type { User } from '@domain/entities/User';
import type { UserRepositoryInterface } from '@domain/ports/user.repository.interface';

export class RequiredError extends Error {}
export class EmailError extends Error {}

export class RegistrationUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  execute(registrationCommand: User) {
    if (registrationCommand.firstname.length === 0) {
      throw new RequiredError();
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(registrationCommand.email)) {
      throw new EmailError();
    }
    this.userRepository.save(registrationCommand);
  }
}
