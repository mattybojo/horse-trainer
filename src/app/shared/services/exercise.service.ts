import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private db: AngularFirestore) {}

  loadAllExercises(): Observable<Exercise[]> {
    return this.db.
      collection('exercises', ref => ref.orderBy('name'))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Exercise>(snaps))
      );
  }

  addExercise(exercise: Exercise): Observable<DocumentReference> {
    return from(this.db.collection('exercises').add({ ...exercise }));
  }

  updateExercise(exercise: Exercise): Observable<void> {
    return from(this.db.doc(`exercises/${exercise.id}`).update(exercise));
  }

  deleteExercise(exercise: Exercise): Observable<void> {
    return from(this.db.doc(`exercises/${exercise.id}`).delete());
  }
}
