/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform imports
import {
  Component,
  OnInit,
  HostBinding,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

// App Imports
import { DialogService } from '../../../core/services';
import { DialogMessage, DialogConfig } from '../../../core/interfaces';

import { DIALOG } from './dialog.constants';

// Rxjs Imports
import { Subject } from 'rxjs/Subject';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         COMPONENT DECLARATION         •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Component({
  moduleId: module.id,
  selector: 'dialog-popup',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss'],
  host: {
    '[@displayState]': 'getDisplayState()'
  },
  animations: [
    trigger('displayState', [
      state(
        DIALOG.STATE.DISPLAYED,
        style({
          opacity: 1,
          pointerEvents: 'all'
        })
      ),
      state(
        DIALOG.STATE.HIDDEN,
        style({
          opacity: 0,
          pointerEvents: 'none'
        })
      ),
      transition(
        `${DIALOG.STATE.HIDDEN} => ${DIALOG.STATE.DISPLAYED}`,
        animate('.5s cubic-bezier(0.25, 0.8, 0.25, 1)')
      ),
      transition(
        `${DIALOG.STATE.DISPLAYED} => ${DIALOG.STATE.HIDDEN}`,
        animate('.2s cubic-bezier(0.25, 0.8, 0.25, 1)')
      )
    ])
  ]
})
export class DialogComponent implements OnInit {
  /** –––
   *  –– Variables
   */
  private dialogResponse: Subject<boolean>;
  public dialogState: string;
  public dialogConfig: DialogConfig;

  /** –––
   *  –– Constructor
   */
  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this.dialogState = DIALOG.STATE.HIDDEN;

    // Subscribe to DialogService.
    this.dialogService.subscribe(dialogMessage => {
      if (!this.dialogResponse || this.dialogResponse.isStopped) {
        this.dialogConfig = dialogMessage.config;
        this.dialogState = DIALOG.STATE.DISPLAYED;

        // Set response observer.
        this.dialogResponse = dialogMessage.response;
      }
    });
  }

  private sendResponse(value: boolean) {
    if (this.dialogResponse && !this.dialogResponse.closed) {
      this.dialogResponse.next(value);
      this.dialogResponse.complete();
      this.dialogState = DIALOG.STATE.HIDDEN;
    }
  }

  private getDisplayState() {
    return this.dialogState;
  }

  /** –––
   *  –– Public Methods
   */
  dismiss() {
    this.sendResponse(false);
  }

  confirm() {
    this.sendResponse(true);
  }
}
