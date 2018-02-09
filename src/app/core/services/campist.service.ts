import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { Campist } from './models/campist.class';

@Injectable()
export class CampistService {
  campistsCollection: AngularFirestoreCollection<Campist>;
  campists: Observable<Campist[]>;

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

  getCampists() {
    return this.campists;
  }

  getSingleCampist(id) {
    return this.campistsCollection
      .doc(id)
      .snapshotChanges()
      .map(x => {
        const data = x.payload.data() as Campist;
        data.id = x.payload.id;
        return data;
      });
  }

  getLogsCampist(id) {
    return this.afs.collection('logs', (ref) => ref.where('idCampist', '==', id))
    .snapshotChanges()
    .map((changes) => {
      return changes.map((_data) => {
        const data = _data.payload.doc.data();
        data.id = _data.payload.doc.id;
        return data;
      });
    });
  }

  addCampist(_campist: Campist) {
    this.campistsCollection.add(JSON.parse(JSON.stringify(_campist)));
  }

  deleteCampist(id: string) {
    const campistDoc = this.afs.doc(`campists/${id}`);
    return campistDoc.delete();
  }

  updateCampist(_campist: Campist) {
    const campistDoc = this.afs.doc(`campists/${_campist.id}`);
    campistDoc.update(JSON.parse(JSON.stringify(_campist)));
  }
}
