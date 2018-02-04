import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { LogInjection } from './models/log.class';

@Injectable()
export class LogInjectionService {
  logInjectionCollection: AngularFirestoreCollection<LogInjection>;
  logInjection: Observable<LogInjection[]>;

  constructor(public afs: AngularFirestore) {
    this.logInjectionCollection = this.afs.collection('logInjection');
    this.logInjection = this.logInjectionCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as LogInjection;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getLogInjections() {
    return this.logInjection;
  }

  addLogInjection(_campist: LogInjection) {
    this.logInjectionCollection.add(_campist);
  }

  deleteLogInjection(_campist: LogInjection) {
    const campistDoc = this.afs.doc(`logInjection/${_campist.id}`);
    campistDoc.delete();
  }

  updateLogInjection(_campist: LogInjection) {
    const campistDoc = this.afs.doc(`logInjection/${_campist.id}`);
    campistDoc.update(_campist);
  }
}
