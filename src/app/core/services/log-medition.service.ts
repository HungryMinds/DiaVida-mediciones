import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { LogMedition } from './models/log.class';

@Injectable()
export class LogMeditionService {
  logMeditionCollection: AngularFirestoreCollection<LogMedition>;
  logMedition: Observable<LogMedition[]>;

  constructor(public afs: AngularFirestore) {
    this.logMeditionCollection = this.afs.collection('log');
  }

  getLogMeditions() {
    return this.logMedition;
  }

  addLogMedition(_medition: LogMedition, _campist: string) {
    var campistsLogsCollection = this.afs.collection('campists/' + _campist + '/logs');
    this.logMeditionCollection.add(JSON.parse(JSON.stringify(_medition))).then(
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

  deleteLogMedition(_campist: LogMedition) {
    const campistDoc = this.afs.doc(`logMedition/${_campist.id}`);
    campistDoc.delete();
  }

  updateLogMedition(_campist: LogMedition) {
    const campistDoc = this.afs.doc(`logMedition/${_campist.id}`);
    campistDoc.update(_campist);
  }
}
