import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { LogFood, LogMedition, LogInjection } from './models/log.class';

@Injectable()
export class LogService {
  // TODO: hacer con los 3 tipos de log
  campistsCollection: AngularFirestoreCollection<Campist>;
  // TODO: hacer con los 3 tipos de log
  campists: Observable<Campist[]>;

  // TODO: hacer con los 3 tipos de log
  constructor(public afs: AngularFirestore) {
    this.campistsCollection = this.afs.collection('campists');
    this.campists = this.campistsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Campist;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  // TODO: hacer con los 3 tipos de log
  getCampists() {
    return this.campists;
  }

  // TODO: hacer con los 3 tipos de log
  addCampist(_campist: Campist) {
    this.campistsCollection.add(_campist);
  }

  // TODO: hacer con los 3 tipos de log
  deleteCampist(_campist: Campist) {
    const campistDoc = this.afs.doc(`campists/${_campist.id}`);
    campistDoc.delete();
  }

  // TODO: hacer con los 3 tipos de log
  updateCampist(_campist: Campist) {
    const campistDoc = this.afs.doc(`campists/${_campist.id}`);
    campistDoc.update(_campist);
  }
}
