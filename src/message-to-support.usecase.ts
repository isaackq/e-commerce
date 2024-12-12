export type Message = {
  title: string,
  subject: string,
};

export class MessageToSupportUseCase {
  message: Message;
  execute(messageToSupportCommand: Message) {
    this.message = messageToSupportCommand;
  };
};