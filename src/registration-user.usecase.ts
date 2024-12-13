export type User = {
  firstname: string;
  lastname: string;
  email: string;
  birthday: Date;
  mobileNumber: string;
};

export class RegistrationUserUseCase {
  user: User | null = null;
  execute(registrationCommand: User) {
    this.user = registrationCommand;
  }
}
