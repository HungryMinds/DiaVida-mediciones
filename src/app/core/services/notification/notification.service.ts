/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports.
import { Injectable } from '@angular/core';

// Rxjs Imports
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { PartialObserver } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

// App Imports
import { Notification } from '../../interfaces';
import { NotificationType } from '../../enums';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••           SERVICE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Injectable()
export class NotificationService {
  /** –––
   *  –– Variables
   */

  private notificationSource: Subject<Notification>;

  /** –––
   *  –– Constructor
   */
  constructor() {
    this.notificationSource = new Subject<Notification>();
  }

  /** –––
   *  –– Public Methods
   */

  subscribe(
    observerOrNext?: (value: Notification) => void,
    error?: (value: any) => void,
    complete?: () => void
  ): Subscription {
    return this.notificationSource.subscribe(observerOrNext, error, complete);
  }

  unsubscribe(subscription: Subscription) {
    subscription.unsubscribe();
  }

  pushNotification(
    notificationMessage: string,
    notificationType: NotificationType = NotificationType.Success
  ) {
    if (!notificationMessage || typeof notificationMessage !== 'string') {
      return null;
    }

    const notification = <Notification>{
      message: notificationMessage,
      type: notificationType
    };

    this.notificationSource.next(notification);

    return notification;
  }
}
