export interface EmailParams {
  to: string;
  title: string;
  subject: string;
}

export interface EmailProviderInterface {
  send(emailParams: EmailParams): Promise<boolean>;
}
