import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { LogFood } from './models/log.class';

@Injectable()
export class LogFoodService {
  logFoodCollection: AngularFirestoreCollection<LogFood>;
  logFood: Observable<LogFood[]>;

  constructor(public afs: AngularFirestore) {
    this.logFoodCollection = this.afs.collection('logFood');
    this.logFood = this.logFoodCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as LogFood;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getLogFoods() {
    return this.logFood;
  }

  addLogFood(_campist: LogFood) {
    this.logFoodCollection.add(_campist);
  }

  deleteLogFood(_campist: LogFood) {
    const campistDoc = this.afs.doc(`logFood/${_campist.id}`);
    campistDoc.delete();
  }

  updateLogFood(_campist: LogFood) {
    const campistDoc = this.afs.doc(`logFood/${_campist.id}`);
    campistDoc.update(_campist);
  }
}
