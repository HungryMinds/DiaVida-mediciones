import { Injectable } from '@angular/core';
import { Campist } from './models/campist.class';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { LogInjection } from './models';

@Injectable()
export class LogInjectionService {
  logInjectionCollection: AngularFirestoreCollection<LogInjection>;

  logInjection: Observable<LogInjection[]>;

  constructor(public afs: AngularFirestore) {
    this.logInjectionCollection = this.afs.collection('logs');
  }

  getLogInjections() {
    return this.logInjection;
  }

  addLogInjection(_injection: LogInjection, _campist: string, ) {
    _injection.idCampist = _campist;
    const campistsLogsCollection = this.afs.collection('logs');
    this.logInjectionCollection.add(JSON.parse(JSON.stringify(_injection))).then(
      (x) => {
        campistsLogsCollection.add({ log: x }).then((_x) => {
          return _x;
        }).catch((_x) => {
          return _x;
        });
      }
    ).catch(function (_x) {
      return _x;
    });
  }

  // TODO: rehacer
  // deleteLogInjection(_campist: LogInjection) {
  //   const campistDoc = this.afs.doc(`logInjection/${_campist.id}`);
  //   campistDoc.delete();
  // }

  // updateLogInjection(_campist: LogInjection) {
  //   const campistDoc = this.afs.doc(`logInjection/${_campist.id}`);
  //   campistDoc.update(_campist);
  // }
}
