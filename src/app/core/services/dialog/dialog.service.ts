/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports.
import { Injectable } from '@angular/core';

// Rxjs Imports
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Observer, PartialObserver } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

// App Imports
import { DialogMessage, DialogConfig } from '../../interfaces';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••           SERVICE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Injectable()
export class DialogService {
  /** –––
   *  –– Variables
   */

  private dialogSource: Subject<DialogMessage>;

  /** –––
   *  –– Constructor
   */
  constructor() {
    this.dialogSource = new Subject<DialogMessage>();
  }

  /** –––
   *  –– Public Methods
   */

  subscribe(
    observerOrNext?: (value: DialogMessage) => void,
    error?: (value: any) => void,
    complete?: () => void
  ): Subscription {
    return this.dialogSource.subscribe(observerOrNext, error, complete);
  }

  unsubscribe(subscription: Subscription) {
    subscription.unsubscribe();
  }

  displayDialog(config: DialogConfig): Observable<boolean> {
    const response = new Subject<boolean>();
    this.dialogSource.next({ config, response });
    return response;
  }
}
