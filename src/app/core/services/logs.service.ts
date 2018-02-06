import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { Campist } from './models/campist.class';

@Injectable()
export class LogsService {
  constructor(public afs: AngularFirestore) {}

  getCampistLogs(idCamper: string) {
    // return this.campists;
    const logsCollection: AngularFirestoreCollection<any> = this.afs.collection(
      `campists/${idCamper}/logs`
    );
    const logs: Observable<any> = logsCollection
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      });
    debugger;
    return logs;
  }

  getCampistLogsByDay(idCamper: string) {
    const logsCollection: AngularFirestoreCollection<any> = this.afs.collection(
      `campists/${idCamper}/logs`
    );
    const logs = logsCollection
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      });
    debugger;
    // logs = this.groupBy(logs, 'datetime');
    return logs;
  }

  private groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
}
