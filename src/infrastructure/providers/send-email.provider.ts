import { EmailParams, EmailProviderInterface } from '@application/event-dispatcher/providers/send-email.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailProvider implements EmailProviderInterface {
  async send(emailParams: EmailParams): Promise<boolean> {
    console.log(`sending ${emailParams.title} to ${emailParams.to}`);

    return true;
  }
}
