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
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return age - 1 > 16;
    }

    return age > 16;
  }

  get value(): Date {
    return this._value;
  }

  toJSON(): string {
    return this._value.toISOString().split('T')[0];
  }
}
