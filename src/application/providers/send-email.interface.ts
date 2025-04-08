export interface EmailParams {
  to: string;
  title: string;
  subject: string;
}

export interface SendEmailProviderInterface {
  send(emailParams: EmailParams): Promise<boolean>;
}
