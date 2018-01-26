/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

import { NotificationType } from '../../../core/enums';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••          CONSTANTS DEFINITION         •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

const notificationClass = new Map<
  NotificationType,
  { icon: string; class: string }
>();
notificationClass.set(NotificationType.Success, {
  icon: 'icon-check',
  class: 'success'
});
notificationClass.set(NotificationType.Error, {
  icon: 'icon-warning',
  class: 'error'
});

export const NOTIFICATION = {
  STATE: {
    INACTIVE: 'off',
    ACTIVE: 'on'
  },
  STYLES_MAP: notificationClass,
  TIME_HOOKS: {
    DISPOSABLE: 1,
    FINISHED: 4
  },
  SWITCH_DELAY: 500
};
