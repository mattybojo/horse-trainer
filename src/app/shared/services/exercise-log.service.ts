import { Horse } from './../models/horse.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertSnaps } from './db-utils';
import { ExerciseLog } from '../models/exercise-log.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseLogService {

  constructor(private db: AngularFirestore) {}

  getHorseLogs(horse: Horse): Observable<ExerciseLog[]> {
    return this.db.
      collection('exerciseLogs', ref => ref.where('horse.ref', '==', this.db.collection('horses').doc(horse.id).ref))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<ExerciseLog>(snaps))
      );
  }

  addExerciseLog(exerciseLog: ExerciseLog, horseId: string, exerciseId: string): Observable<DocumentReference> {
    exerciseLog.horse = this.getDocRef(exerciseLog.horse.name, horseId, 'horses');
    exerciseLog.exercise = this.getDocRef(exerciseLog.exercise.name, exerciseId, 'exercises');
    return from(this.db.collection('exerciseLogs').add({ ...exerciseLog }));
  }

  updateExerciseLog(exerciseLog: ExerciseLog, horseId: string, exerciseId: string): Observable<void> {
    exerciseLog.horse = this.getDocRef(exerciseLog.horse.name, horseId, 'horses');
    exerciseLog.exercise = this.getDocRef(exerciseLog.exercise.name, exerciseId, 'exercises');
    return from(this.db.doc(`exerciseLogs/${exerciseLog.id}`).update(exerciseLog));
  }

  deleteExerciseLog(exerciseLog: ExerciseLog): Observable<void> {
    return from(this.db.doc(`exerciseLogs/${exerciseLog.id}`).delete());
  }

  private getDocRef(objName: string, objId: string, collectionName: string): {name: string, ref: DocumentReference} {
    return {name: objName, ref: this.db.collection(collectionName).doc(objId).ref};
  }
}
