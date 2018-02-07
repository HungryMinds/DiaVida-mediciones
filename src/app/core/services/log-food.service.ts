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
    this.logFoodCollection = this.afs.collection('log');
  }

  getLogFoods() {
    return this.logFood;
  }

  addLogFood(_food: LogFood, _campist: string) {
    var campistsLogsCollection = this.afs.collection('campists/' + _campist + '/logs');
    this.logFoodCollection.add(JSON.parse(JSON.stringify(_food))).then(
      (x) => {
        campistsLogsCollection.add({ log: x }).then((x) => {
          return x
        }).catch((x) => {
          return x
        })
      }
    ).catch(function (x) {
      return x
    })
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
