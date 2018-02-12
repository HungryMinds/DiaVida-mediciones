import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { LogFood } from './models/log.class';

@Injectable()
export class LogFoodService {
  logFoodCollection: AngularFirestoreCollection<LogFood>;
  logFood: Observable<LogFood[]>;

  constructor(public afs: AngularFirestore) {
    this.logFoodCollection = this.afs.collection('logs');
  }

  getLogFoods() {
    return this.logFood;
  }

  addLogFood(_food: LogFood, _campist: string) {
    _food.idCampist = _campist;
    return this.logFoodCollection.add(JSON.parse(JSON.stringify(_food)));
  }

  deleteFood(_log) {
    return this.logFoodCollection.doc(_log).delete();
  }

  getLogFood(id) {
    return this.logFoodCollection
      .doc(id)
      .snapshotChanges()
      .map(x => {
        if (x.payload.exists) {
          const data = x.payload.data() as LogFood;
          data.id = x.payload.id;
          return data;
        }
      });
  }
  patchLogFood(_injection: LogFood, _log: string) {
    console.log(_injection);
    return this.logFoodCollection.doc(_log).update(
      JSON.parse(JSON.stringify(_injection))
    );
  }

  // TODO: hacer de manera adecuada
  // deleteLogFood(_campist: LogFood) {
  //   const campistDoc = this.afs.doc(`logFood/${_campist.id}`);
  //   campistDoc.delete();
  // }

  // updateLogFood(_campist: LogFood) {
  //   const campistDoc = this.afs.doc(`logFood/${_campist.id}`);
  //   campistDoc.update(_campist);
  // }
}
