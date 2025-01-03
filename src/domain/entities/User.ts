export class User {
  constructor(
    public id: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public birthday: Date,
    public mobileNumber: string,
  ) {}
}
