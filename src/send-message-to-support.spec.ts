import { describe, expect, test } from '@jest/globals';

import type { Message } from './send-message-to-support.usecase';
import { SendMessageToSupportUseCase } from './send-message-to-support.usecase';

describe('Feature: Send message To Support', () => {
  describe('Scenario: Successfuly send message', () => {
    test('Role: ', () => {
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
});

let mssageToSupportUseCase: SendMessageToSupportUseCase =
  new SendMessageToSupportUseCase();

function whenMessageToSupport(messageToSupportCommand: Message) {
  mssageToSupportUseCase.execute(messageToSupportCommand);
}

function thenMessageToSupport(expectedMessage: Message) {
  expect(expectedMessage).toEqual(mssageToSupportUseCase.message);
}
