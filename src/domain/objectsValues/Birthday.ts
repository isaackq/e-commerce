export class Birthday {
  private _value: Date;

  constructor(value: Date) {
    if (!this.isAgeValid(value)) {
      throw new Error('Age must be greater than 16 years.');
    }
    this._value = value;
  }

  private isAgeValid(date: Date): boolean {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 16);

    return date <= minDate;
  }

  get value(): Date {
    return this._value;
  }

  toJSON(): string {
    return this._value.toISOString().split('T')[0];
  }
}
