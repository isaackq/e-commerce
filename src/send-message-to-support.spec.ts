import {
  RequiredError,
  SendMessageToSupportUseCase,
} from '@application/usecase/send-message-to-support.usecase';
import type { Message } from '@domain/entities/Message';
import type { MessageRepositoryInterface } from '@domain/ports/message.repository.interface';
import { describe, expect, test } from '@jest/globals';

describe('Feature: Send message To Support', () => {
  describe('Scenario: Successfuly send message', () => {
    test('Role: As a user, I can sent message to support on the platform', () => {
      whenMessageToSupport({
        title: 'Name',
        subject: 'Hazem Hazem',
      });
      thenMessageToSupport({
        title: 'Name',
        subject: 'Hazem Hazem',
      });
    });
  });

  describe('Scenario: Prevent user send message with empty ', () => {
    test('Role: As a user, I cannot register with empty tilte or subject or both ', () => {
      whenMessageToSupport({
        title: '',
        subject: '',
      });
      thenUserConnotSendMessageToSupport(RequiredError);
    });
  });
});

export class InMemoryMessageRepository implements MessageRepositoryInterface {
  messages: Message[] = [];
  save(registrationCommand: Message): Message {
    this.messages.push(registrationCommand);
    return registrationCommand;
  }
  findOne(): Message {
    return this.messages[0];
  }
}

let throwError: Error;

let inMemoryMessageRepository = new InMemoryMessageRepository();

let mssageToSupportUseCase: SendMessageToSupportUseCase =
  new SendMessageToSupportUseCase(inMemoryMessageRepository);

function whenMessageToSupport(messageToSupportCommand: Message) {
  try {
    mssageToSupportUseCase.execute(messageToSupportCommand);
  } catch (error) {
    if (error instanceof Error) {
      throwError = error;
    } else {
      console.log(error);
    }
  }
}

function thenMessageToSupport(expectedMessage: Message) {
  expect(expectedMessage).toEqual(inMemoryMessageRepository.findOne());
}

function thenUserConnotSendMessageToSupport(expectedError: new () => Error) {
  expect(throwError).toBeInstanceOf(expectedError);
}
