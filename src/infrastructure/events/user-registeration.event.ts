export class UserRegisterationEvent {
  public name: string;
  public email: string;
  public mobileNumber: string;

  constructor(name: string, email: string, mobileNumber: string) {
    this.name = name;
    this.email = email;
    this.mobileNumber = mobileNumber;
  }
}
