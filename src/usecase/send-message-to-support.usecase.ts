export type Message = {
  title: string;
  subject: string;
};

export class SendMessageToSupportUseCase {
  message: Message | null = null;
  execute(messageToSupportCommand: Message) {
    this.message = messageToSupportCommand;
  }
}
