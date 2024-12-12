import { describe, expect, test } from '@jest/globals';
import { MessageToSupportUseCase, Message } from './message-to-support.usecase';

describe("Feature: Message To Support", () => {
  describe("Scenario: Successfuly send message", () => {
    test("Role: ", () => {
      whenMessageToSupport({
        title: "Name",
        subject: "Hazem Hazem",
      });
      thenMessageToSupport({
        title: "Name",
        subject: "Hazem Hazem"
      });
    });
  });
});

let mssageToSupportUseCase: MessageToSupportUseCase = new MessageToSupportUseCase();


function whenMessageToSupport(messageToSupportCommand: Message) {
  mssageToSupportUseCase.execute(messageToSupportCommand);
};

function thenMessageToSupport(expectedMessage: Message) {
  expect(expectedMessage).toEqual(mssageToSupportUseCase.message);
};