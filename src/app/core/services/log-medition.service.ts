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
    this.logMeditionCollection = this.afs.collection('logMedition');
    this.logMedition = this.logMeditionCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as LogMedition;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getLogMeditions() {
    return this.logMedition;
  }

  addLogMedition(_campist: LogMedition) {
    this.logMeditionCollection.add(_campist);
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
