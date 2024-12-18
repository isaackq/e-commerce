import { describe, expect, test } from '@jest/globals';

import type {
  User,
  UserGatwayInterface,
} from './usecase/registration-user.usecase';
import { RegistrationUserUseCase } from './usecase/registration-user.usecase';

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

    /*test('Role: As a user, I cannot register with empty firstname input', () => {
      whenRegistrationUser({
        firstname: '',
        lastname: 'mouhamed',
        email: 'ellouze@gmail.com',
        birthday: new Date('2000-01-01'),
        mobileNumber: '0123456789',
      });
      thenUserConnotRegistration(RequiredError);
    });*/
  });
});

//let throwError: Error = new Error();

export class InMemoryUserGateway implements UserGatwayInterface {
  users: User[] = [];

  save(registrationCommand: User): User {
    this.users.push(registrationCommand);

    return registrationCommand;
  }

  findOne(): User {
    return this.users[0];
  }
}

let inMemoryUserGateway = new InMemoryUserGateway();

let registrationUserUseCase: RegistrationUserUseCase =
  new RegistrationUserUseCase(inMemoryUserGateway);

function whenRegistrationUser(registrationCommand: User) {
  try {
    registrationUserUseCase.execute(registrationCommand);
  } catch (error) {
    console.log(error);
    //throwError = error;
  }
}

function thenUserRegistredSouldBe(expextedUser: User) {
  expect(expextedUser).toEqual(inMemoryUserGateway.findOne());
}

/*function thenUserConnotRegistration(expectedError: new () => Error) {
  expect(throwError).toBeInstanceOf(expectedError);
}*/
