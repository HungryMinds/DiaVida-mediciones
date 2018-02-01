import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

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

  addCampist(_campist: Campist) {
    this.campistsCollection.add(_campist);
  }

  deleteCampist(_campist: Campist) {
    const campistDoc = this.afs.doc(`campists/${_campist.id}`);
    campistDoc.delete();
  }

  updateCampist(_campist: Campist) {
    const campistDoc = this.afs.doc(`campists/${_campist.id}`);
    campistDoc.update(_campist);
  }
}

/*
const campist = {
  id: '[id en caso de edicion]',
  names: '[nombres]',
  lastNames: '[apellidos]',
  age: '[edad]',
  team: '[grupo]',
  allergies: '[texto]',
  medications: '[texto]',
  insulinSchemeInterval: {
    comment: '[texto]',
    scheme: [
      {
        foodTime:
          '[string del tiempo de comida en ingles (Breakfast) como se ve en el enum]',
        quantity: '[numero]'
      }
    ]
  },
  insulinSchemeRatio: {
    scheme: [
      {
        foodTime: '[]',
        quantity: '[numero]'
      }
    ],
    fC: '[numero]',
    comment: '[string]'
  },
  basalInsulin: [
    {
      dosage: '[number]',
      timestamp: '[hour]',
      comment: '[string]'
    }
  ],
  foodTable: [
    {
      foodTime: '[breakfast...etc]',
      foodType: '[proteins, dairy, etc]'
    }
  ]
};
*/
