/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform imports
import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

// App Imports
import { NotificationService } from '../../../core/services';
import { Notification } from '../../../core/interfaces';
import { NotificationType } from '../../../core/enums';

import { NOTIFICATION } from './notification.constants';

// Rxjs Imports
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         COMPONENT DECLARATION         •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Component({
  moduleId: module.id,
  selector: 'notification-toaster',
  templateUrl: 'notification-toaster.component.html',
  styleUrls: ['notification-toaster.component.scss'],
  animations: [
    trigger('displayState', [
      state(
        NOTIFICATION.STATE.INACTIVE,
        style({
          transform: 'translateY(150%)'
        })
      ),
      state(
        NOTIFICATION.STATE.ACTIVE,
        style({
          transform: 'translateY(0)'
        })
      ),
      transition(
        `${NOTIFICATION.STATE.INACTIVE} => ${NOTIFICATION.STATE.ACTIVE}`,
        animate('.35s cubic-bezier(0.25, 0.8, 0.25, 1)')
      ),
      transition(
        `${NOTIFICATION.STATE.ACTIVE} => ${NOTIFICATION.STATE.INACTIVE}`,
        animate('.23s cubic-bezier(0.25, 0.8, 0.25, 1)')
      )
    ])
  ]
})
export class NotificationToasterComponent implements OnInit {
  /** –––
   *  –– Variables
   */
  private notificationSubscription: Subscription;
  private intervalChecker$: Observable<number>;
  private notificationStack: Notification[];
  private timerSubscription: Subscription;

  public notificationMessage: string;
  public notificationState: string;
  public notificationIcon: string;
  public notificationType: string;

  public;
  set notification(notification: Notification) {
    // If not interval set, fires it, otherwise stack it.
    if (!this.timerSubscription) {
      this.setNotificationValues(notification);
      this.notificationState = NOTIFICATION.STATE.ACTIVE;

      this.timerSubscription = this.intervalChecker$.subscribe(
        (second: number) => {
          if (
            second === NOTIFICATION.TIME_HOOKS.FINISHED ||
            (second >= NOTIFICATION.TIME_HOOKS.DISPOSABLE &&
              this.notificationStack.length)
          ) {
            this.notificationState = NOTIFICATION.STATE.INACTIVE;
            this.disposeTimerSubscription();
          }
        },
        error => {
          this.notificationState = NOTIFICATION.STATE.INACTIVE;
        }
      );
    } else {
      this.notificationStack.push(notification);
    }
  }

  /** –––
   *  –– Constructor
   */
  constructor(private notificationService: NotificationService) {
    this.intervalChecker$ = Observable.interval(1000);
  }

  /** –––
   *  –– Helper methods
   */
  private disposeTimerSubscription() {
    this.timerSubscription.unsubscribe();
    this.timerSubscription = null;
    this.fireNextNotification();
  }

  private fireNextNotification() {
    setTimeout(() => {
      if (this.notificationStack.length) {
        this.notification = this.notificationStack.shift();
      }
    }, NOTIFICATION.SWITCH_DELAY);
  }

  private setNotificationValues(notification: Notification) {
    const styleObject = NOTIFICATION.STYLES_MAP.get(notification.type);
    this.notificationMessage = notification.message;
    this.notificationIcon = styleObject.icon;
    this.notificationType = styleObject.class;
  }

  /** –––
   *  –– Lifecycle hooks
   */
  ngOnInit() {
    this.notificationStack = [];
    this.notificationState = NOTIFICATION.STATE.INACTIVE;

    this.notificationSubscription = this.notificationService.subscribe(
      (notification: Notification) => {
        this.notification = notification;
      },
      error => {
        console.group('Error during observing for notifications');
        console.error(error);
        console.groupEnd();
      }
    );
  }

  /** –––
   *  –– Public methods
   */
}
