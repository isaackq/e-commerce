import {
  EmailError,
  RegistrationUserUseCase,
  RequiredError,
} from '@application/user/usecase/registration-user.usecase';
import type { User } from '@domain/entities/user/User';
import { InMemoryUserRepository } from '@infrastructure/repositories/in-memory.user.repository';
import { beforeEach, describe, expect, test } from '@jest/globals';

describe('Feature: User Registration', () => {
  let fixture: Fixture;

  beforeEach(() => {
    fixture = createFixture();
  });

  describe('Scenario: Successfuly registration user', () => {
    test('Role: As a user, I can register on the platform', () => {
      const inputData = {
        firstname: 'ellouze',
        lastname: 'mouhamed',
        email: 'ellouze@gmail.com',
        birthday: new Date('2000-01-01'),
        mobileNumber: '0123456789',
      };

      fixture.whenRegistrationUser(inputData);
      fixture.thenUserRegisteredSouldBe(inputData);
    });
  });

  describe('Scenario: Prevent user registration with invalid data', () => {
    test('Role: As a user, I cannot register with empty firstname input', () => {
      fixture.whenRegistrationUser({
        firstname: '',
        lastname: 'mouhamed',
        email: 'ellouze@gmail.com',
        birthday: new Date('2000-01-10'),
        mobileNumber: '0123456789',
      });
      fixture.thenUserConnotRegistration(RequiredError);
    });
    test('Role: As a user, I cannot register with invalid email', () => {
      fixture.whenRegistrationUser({
        firstname: 'firstname',
        lastname: 'mouhamed',
        email: 'ellouze@gmai',
        birthday: new Date('2000-01-01'),
        mobileNumber: '0123456789',
      });
      fixture.thenUserConnotRegistration(EmailError);
    });
  });
});

function createFixture() {
  let throwError: Error;
  const inMemoryUserGateway = new InMemoryUserRepository();
  const registrationUserUseCase: RegistrationUserUseCase = new RegistrationUserUseCase(inMemoryUserGateway);

  return {
    whenRegistrationUser(registrationCommand: User) {
      try {
        registrationUserUseCase.execute(registrationCommand);
      } catch (error) {
        if (error instanceof Error) {
          throwError = error;
        } else {
          console.log(error);
        }
      }
    },
    thenUserRegisteredSouldBe(expextedUser: User) {
      expect(expextedUser).toEqual(inMemoryUserGateway.findOne());
    },
    thenUserConnotRegistration(expectedError: new () => Error) {
      expect(throwError).toBeInstanceOf(expectedError);
    },
  };
}

type Fixture = ReturnType<typeof createFixture>;
