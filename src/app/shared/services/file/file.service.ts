/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports.
import { Injectable } from '@angular/core';

// Rxjs Imports
import { Observable } from 'rxjs/Observable';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••           SERVICE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Injectable()
export class FileService {
  /** –––
   *  –– Constructor
   */
  constructor() {}

  /** –––
   *  –– Helper Methods
   */

  /** –––
   *  –– Public Methods
   */

  createBlob(data: any[], type: string) {
    return new Blob(data, { type });
  }

  saveFile(file: Blob | File, filename?: string) {
    // saveAs(file, filename);
  }
}
