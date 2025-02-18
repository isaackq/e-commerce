import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsObjectId implements ValidatorConstraintInterface {
  validate(value: string) {
    return Types.ObjectId.isValid(value);
  }

  defaultMessage() {
    return 'Text ($value) is not a valid Id';
  }
}
