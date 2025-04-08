import { EmailParams, SendEmailProviderInterface } from '@application/providers/send-email.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailProvider implements SendEmailProviderInterface {
  async send(emailParams: EmailParams): Promise<boolean> {
    console.log(`sending ${emailParams.title} to ${emailParams.to}`);

    return true;
  }
}
