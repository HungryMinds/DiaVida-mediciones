import { Injectable } from '@angular/core';

@Injectable()
export class FormLifeCycleService {
  constructor() {}

  currentCampiest = {};

  getCurrentCampiest() {
    return this.currentCampiest;
  }

  updateCurrentCampiest(campiest) {
    this.currentCampiest = Object.assign(this.currentCampiest, campiest);
  }

  cleanCurrent() {
    this.currentCampiest = {};
  }

  deleteKey(key) {
    if (this.currentCampiest[key]) {
      delete this.currentCampiest[key];
    }
  }
}
