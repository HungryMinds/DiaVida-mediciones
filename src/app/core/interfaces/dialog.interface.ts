/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
import { Subject } from 'rxjs/Subject';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         INTERFACE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export interface DialogConfig {
  title: string;
  message: string;
  cancelAction: string;
  applyAction: string;
}

export interface DialogMessage {
  config: DialogConfig;
  response: Subject<boolean>;
}
