import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'objectId', async: false })
export class IsObjectId implements ValidatorConstraintInterface {
  validate(value: string) {
    return Types.ObjectId.isValid(value);
  }

  defaultMessage() {
    return `this Id is not a valid Id`;
  }
}
