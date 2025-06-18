export class Birthday {
  private _value: Date;

  constructor(value: Date) {
    if (!this.isAgeValid(value))
      throw new Error('Age must be greater than 16 years.');
  }

  private isAgeValid(date: Date): boolean {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 16);

    return date <= minDate;
  }

  get value() {
    return this._value;
  }
}
