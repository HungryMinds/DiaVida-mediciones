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
    this.logMeditionCollection = this.afs.collection('logs');
  }

  getLogMeditions() {
    return this.logMedition;
  }

  addLogMedition(_medition: LogMedition, _campist: string) {
    _medition.idCampist = _campist;
    this.logMeditionCollection.add(JSON.parse(JSON.stringify(_medition)));
  }

  // TODO: hacer de manera adecuada
  // deleteLogMedition(_campist: LogMedition) {
  //   const campistDoc = this.afs.doc(`log/${_campist.id}`);
  //   campistDoc.delete();
  // }

  // updateLogMedition(_campist: LogMedition) {
  //   const campistDoc = this.afs.doc(`log/${_campist.id}`);
  //   campistDoc.update(_campist);
  // }
}
