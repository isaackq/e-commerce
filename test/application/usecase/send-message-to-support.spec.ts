import {
  SendMessageToSupportUseCase,
} from '@application/usecase/send-message-to-support.usecase';
import type { Message } from '@domain/entities/Message';
import { InMemoryMessageRepository } from '@infrastructure/repositories/in-memory.message.repository';
import { beforeEach, describe, expect, test } from '@jest/globals';

describe('Feature: Send message To Support', () => {
  let fixture: Fixture;
  beforeEach(() => {
    fixture = createFixture();
  });

  describe('Scenario: Successfuly send message', () => {
    test('Role: As a user, I can sent message to support on the platform', () => {
      const messageData = {
        title: 'Name',
        content: 'Hazem Hazem',
      };
      fixture.whenMessageToSupport(messageData);
      fixture.thenMessageToSupport(messageData);
    });
  });

  describe('Scenario: Prevent user send message with empty ', () => {
    test('Role: As a user, I cannot register with empty tilte or content or both ', () => {
      fixture.whenMessageToSupport({
        title: '',
        content: '',
      });
      fixture.thenUserConnotSendMessageToSupport(Error);
    });
  });
});

function createFixture() {
  let throwError: Error;

  let inMemoryMessageRepository = new InMemoryMessageRepository();

  let mssageToSupportUseCase: SendMessageToSupportUseCase =
    new SendMessageToSupportUseCase(inMemoryMessageRepository);

  return {
    whenMessageToSupport(messageToSupportCommand: Message) {
      try {
        mssageToSupportUseCase.execute(messageToSupportCommand);
      } catch (error) {
        if (error instanceof Error) {
          throwError = error;
        } else {
          console.log(error);
        }
      }
    },

    thenMessageToSupport(expectedMessage: Message) {
      expect(expectedMessage).toEqual(inMemoryMessageRepository.findOne());
    },

    thenUserConnotSendMessageToSupport(expectedError: new () => Error) {
      expect(throwError).toBeInstanceOf(expectedError);
    },
  };
}

type Fixture = ReturnType<typeof createFixture>;
