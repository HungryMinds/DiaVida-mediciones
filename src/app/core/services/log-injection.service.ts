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

  addLogInjection(_injection: LogInjection, _campist: string) {
    _injection.idCampist = _campist;
    return this.logInjectionCollection.add(
      JSON.parse(JSON.stringify(_injection))
    );
  }

  patchLogInjection(_injection: LogInjection, _log: string) {
    console.log(_injection)
    return this.logInjectionCollection.doc(_log).update(
      JSON.parse(JSON.stringify(_injection))
    );
  }

  getLogInjection(id) {
    return this.logInjectionCollection
      .doc(id)
      .snapshotChanges()
      .map(x => {
        const data = x.payload.data() as LogInjection;
        data.id = x.payload.id;
        return data;
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
