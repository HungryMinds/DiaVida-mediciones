/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Testing Imports
import { TestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';

// Rxjs Imports
import { Subscription } from 'rxjs/Subscription';

// App Imports
import { NotificationService } from './notification.service';
import { Notification } from '../../interfaces';
import { NotificationType } from '../../enums';

describe('CoreModule | NotificationService', () => {
  /**
   * –– Global Variables
   */
  let notificationSubscription: Subscription;

  /**
   * –– Global Functions
   */
  beforeEach(() => {
    // configures our module.
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
  });

  afterEach(() => {
    if (notificationSubscription) {
      notificationSubscription.unsubscribe();
    }
  });

  /**
   * –– Specs definitions
   */
  it(
    'should subscribe to notification source',
    async(
      inject(
        [NotificationService],
        (notificationService: NotificationService) => {
          notificationSubscription = notificationService.subscribe();

          expect(notificationSubscription).toBeDefined();
          expect(notificationSubscription instanceof Subscription).toBeTruthy();
        }
      )
    )
  );

  it(
    'should unsubscribe to notification source',
    async(
      inject(
        [NotificationService],
        (notificationService: NotificationService) => {
          notificationSubscription = notificationService.subscribe();
          expect(notificationSubscription.closed).toBeFalsy();

          notificationService.unsubscribe(notificationSubscription);
          expect(notificationSubscription.closed).toBeTruthy();

          notificationSubscription = null;
        }
      )
    )
  );

  it(
    'should push notifications',
    fakeAsync(
      inject(
        [NotificationService],
        (notificationService: NotificationService) => {
          const successMessage = 'Se ha enviado la respuesta correctamente',
            errorMessage = 'Sin conexión a internet',
            infoMessage = 'Nuevas consultas disponibles';
          let receivedNotification, notificationResponse;

          notificationSubscription = notificationService.subscribe(
            (notification: Notification) =>
              (receivedNotification = notification),
            error => {
              console.error(error);
              fail();
            }
          );

          notificationResponse = notificationService.pushNotification(
            successMessage
          );

          tick(200);
          expect(receivedNotification).toEqual(notificationResponse);
          expect(receivedNotification.message).toEqual(successMessage);
          expect(receivedNotification.type).toEqual(NotificationType.Success);

          notificationResponse = notificationService.pushNotification(
            successMessage,
            NotificationType.Success
          );

          tick(200);
          expect(receivedNotification).toEqual(notificationResponse);
          expect(receivedNotification.message).toEqual(successMessage);
          expect(receivedNotification.type).toEqual(NotificationType.Success);

          notificationResponse = notificationService.pushNotification(
            errorMessage,
            NotificationType.Error
          );

          tick(200);
          expect(receivedNotification).toEqual(notificationResponse);
          expect(receivedNotification.message).toEqual(errorMessage);
          expect(receivedNotification.type).toEqual(NotificationType.Error);

          notificationResponse = notificationService.pushNotification(
            infoMessage,
            NotificationType.Info
          );

          tick(200);
          expect(receivedNotification).toEqual(notificationResponse);
          expect(receivedNotification.message).toEqual(infoMessage);
          expect(receivedNotification.type).toEqual(NotificationType.Info);
        }
      )
    )
  );

  it(
    'should not send notifications',
    async(
      inject(
        [NotificationService],
        (notificationService: NotificationService) => {
          const wrongMessage = '';
          let notificationResponse;

          notificationResponse = notificationService.pushNotification(
            wrongMessage
          );
          expect(notificationResponse).toBeNull();

          notificationResponse = notificationService.pushNotification(
            wrongMessage,
            NotificationType.Error
          );
          expect(notificationResponse).toBeNull();
        }
      )
    )
  );
});
