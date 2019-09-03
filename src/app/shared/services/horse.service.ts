import { Horse } from './../models/horse.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class HorseService {

  constructor(private db: AngularFirestore) {}

  loadAllHorses(): Observable<Horse[]> {
    return this.db.
      collection('horses', ref => ref.orderBy('name'))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Horse>(snaps))
      );
  }

  addHorse(horse: Horse): Observable<DocumentReference> {
    return from(this.db.collection('horses').add({ ...horse }));
  }

  updateHorse(horse: Horse): Observable<void> {
    return from(this.db.doc(`horses/${horse.id}`).update(horse));
  }

  deleteHorse(horse: Horse): Observable<void> {
    return from(this.db.doc(`horses/${horse.id}`).delete());
  }
}
