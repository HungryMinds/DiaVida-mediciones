/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports
import { Injectable } from '@angular/core';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••           SERVICE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Injectable()
export class LocalStorageService {
  /** –––
   *  –– Constants
   */

  /** –––
   *  –– Variables
   */

  /** –––
   *  –– Constructor
   */
  constructor() {}

  /** –––
   *  Helper Methods
   */

  /** –––
   *  –– Public Methods
   */

  getValue(key: string) {
    if (!key || key === null) {
      return null;
    }
    const storedValue = localStorage.getItem(key);
    return JSON.parse(storedValue);
  }

  storeValue(key: string, value: any) {
    if (!key || key === null) {
      return false;
    }

    const serializedValue = JSON.stringify(value);

    localStorage.setItem(key, serializedValue);

    return true;
  }

  removeValue(key: string) {
    if (!key || key === null) {
      return false;
    }
    const value = localStorage.getItem(key);

    if (value === null) {
      return true;
    }
    localStorage.removeItem(key);

    return JSON.parse(value);
  }
}
