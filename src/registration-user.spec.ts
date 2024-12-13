import { describe, expect, test } from '@jest/globals';

import type { User } from './registration-user.usecase';
import { RegistrationUserUseCase } from './registration-user.usecase';

describe('Feature: User Registration', () => {
  describe('Scenario: Successfuly registration user', () => {
    test('Role: As a user, I can register on the platform', () => {
      whenRegistrationUser({
        firstname: 'ellouze',
        lastname: 'mouhamed',
        email: 'ellouze@gmail.com',
        birthday: new Date('2000-01-01'),
        mobileNumber: '0123456789',
      });
      thenUserRegistredSouldBe({
        firstname: 'ellouze',
        lastname: 'mouhamed',
        email: 'ellouze@gmail.com',
        birthday: new Date('2000-01-01'),
        mobileNumber: '0123456789',
      });
    });
  });
});

let registrationUserUseCase: RegistrationUserUseCase =
  new RegistrationUserUseCase();

function whenRegistrationUser(registrationCommand: User) {
  registrationUserUseCase.execute(registrationCommand);
}

function thenUserRegistredSouldBe(expextedUser: User) {
  expect(expextedUser).toEqual(registrationUserUseCase.user);
}
