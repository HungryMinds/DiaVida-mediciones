/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••                IMPORTS                •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

import { NotificationType } from '../enums';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         INTERFACE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export interface Notification {
  message: string;
  type: NotificationType;
}
