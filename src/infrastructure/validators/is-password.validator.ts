import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  isStrongPassword,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import userPasswordConfig from 'config/user-password.config';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsPasswordValidator implements ValidatorConstraintInterface {
  constructor(
    @Inject(userPasswordConfig.KEY)
    private readonly userPasswordConfiguration: ConfigType<typeof userPasswordConfig>,
  ) {}

  public validate(value: string, _: ValidationArguments): boolean {
    return isStrongPassword(value, { ...this.userPasswordConfiguration });
  }

  defaultMessage(_: ValidationArguments): string {
    return 'The password is not strong enough based on the configured criteria.';
  }
}
