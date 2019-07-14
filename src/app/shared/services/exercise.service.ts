import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  // TODO: This is purely for demo purposes to generate a unique ID.  Remove later.
  private _id = 4;
  get id() {
    return this._id;
  }

  private _exercises: Exercise[] = [
    {
      'id': 1,
      'name': 'Pessoa - Walk'
    }, {
      'id': 2,
      'name': 'Pessoa - Trot'
    }, {
      'id': 3,
      'name': 'Pessoa - Lope'
    }
  ];
  get exercises() {
    return this._exercises;
  }

  addExercise(exercise: Exercise) {
    exercise.id = this._id;
    this._exercises.push(exercise);
    this._id++;
  }

  updateExercise(exercise: Exercise) {
    const index = this._exercises.findIndex((x: Exercise) => x.id === exercise.id);
    this._exercises[index] = exercise;
  }

  deleteExercise(exercise: Exercise) {
    const index = this._exercises.findIndex((x: Exercise) => x.id === exercise.id);
    this._exercises.splice(index, 1);
  }

  constructor() { }
}
