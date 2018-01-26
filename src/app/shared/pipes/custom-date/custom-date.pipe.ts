/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
// Platform Imports
import { Pipe, PipeTransform } from '@angular/core';

// App Imports
import { DATE_I18N_DICTIONARY } from './date-i18n-dictionary.constants';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••          PIPE DECLARATION             •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Pipe({ name: 'customDate' })
export class CustomDatePipe implements PipeTransform {
  /** –––
   *  –– Helper functions
   */
  private isDefined(value) {
    return value !== undefined && value !== null;
  }

  private formatTimeValue(value: number) {
    const stringValue = value.toString();
    return this.isDefined(value)
      ? '00'.substr(0, 2 - stringValue.length) + stringValue
      : '';
  }

  /** –––
   *  –– Transform Implementation
   */
  transform(
    date: Date | string,
    withTime: boolean = false,
    fullTimeFormat: boolean = false
  ) {
    if (date !== undefined && date !== null) {
      let dateValue = date instanceof Date ? date : new Date(date);
      dateValue = new Date(
        dateValue.getTime() + dateValue.getTimezoneOffset() * 60000
      );

      // Validates current date.
      if (!isNaN(dateValue.valueOf())) {
        let formattedDate = `${dateValue.getDate()} ${DATE_I18N_DICTIONARY.ES_CR.MONTHS.get(
          dateValue.getMonth()
        )} ${dateValue.getFullYear()}`;

        if (withTime) {
          const hours = dateValue.getHours(),
            isMorning = hours < 12,
            dateHours =
              !fullTimeFormat && (!isMorning || hours === 0)
                ? hours ? hours % 12 : 12
                : hours;

          formattedDate += ` | ${dateHours}:${this.formatTimeValue(
            dateValue.getMinutes()
          )} ${isMorning ? 'am' : 'pm'}`;
        }
        return formattedDate;
      }
    }
    return '';
  }
}
