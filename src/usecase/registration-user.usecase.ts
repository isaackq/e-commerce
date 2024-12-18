export type User = {
  firstname: string;
  lastname: string;
  email: string;
  birthday: Date;
  mobileNumber: string;
};

export interface UserGatwayInterface {
  save(registrationCommand: User): User;
  findOne(): User;
}

export class RequiredError extends Error {}

export class RegistrationUserUseCase {
  constructor(private readonly userGateway: UserGatwayInterface) {}

  execute(registrationCommand: User) {
    if (registrationCommand.firstname.length === 0) {
      throw new RequiredError();
    }
    this.userGateway.save(registrationCommand);
  }
}
