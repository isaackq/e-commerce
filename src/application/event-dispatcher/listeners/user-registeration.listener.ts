import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Events as EventsEnum } from '../enums/events.enum';
import { UserRegisterationEvent } from '../events/user-registeration.event';
import { EventListenerInterface } from '../ports/event-listener.interface';
import { EmailProviderInterface } from '../providers/send-email.interface';

@Injectable()
export class RegisterationListener implements EventListenerInterface {
  constructor(@Inject('EmailProvider') private readonly emailProvider: EmailProviderInterface) {}

  @OnEvent(EventsEnum.USER_RESIGTERATION)
  async listen(event: UserRegisterationEvent): Promise<boolean> {
    const user = event.user;

    this.emailProvider.send({ to: user.email, title: 'welcome', subject: `welcome to Areisto ${user.firstname}` });

    return true;
  }
}
