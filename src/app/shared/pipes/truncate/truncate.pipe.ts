/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
import { Pipe, PipeTransform } from '@angular/core';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••          PIPE DECLARATION             •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  /** –––
   *  –– Variables
   */
  public ellipsis = '…';

  /** –––
   *  –– Transform Implementation
   */
  transform(value: any, length: number = 50) {
    if (value !== undefined && value !== null) {
      let stringValue = value.toString();

      if (stringValue.length > length) {
        stringValue = `${stringValue.substr(0, length)}${this.ellipsis}`;
      }
      return stringValue;
    }
    return '';
  }
}
