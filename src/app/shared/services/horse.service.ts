import { Horse } from './../models/horse.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HorseService {

  // TODO: This is purely for demo purposes to generate a unique ID.  Remove later.
  private _id = 4;
  get id() {
    return this._id;
  }

  private _horses: Horse[] = [
    {
      'id': 1,
      'name': 'Dixie'
    }, {
      'id': 2,
      'name': 'Peaches'
    }
  ];
  get horses() {
    return this._horses;
  }

  addHorse(horse: Horse) {
    horse.id = this._id;
    this._horses.push(horse);
    this._id++;
  }

  updateHorse(horse: Horse) {
    const index = this._horses.findIndex((x: Horse) => x.id === horse.id);
    this._horses[index] = horse;
  }

  deleteHorse(horse: Horse) {
    const index = this._horses.findIndex((x: Horse) => x.id === horse.id);
    this._horses.splice(index, 1);
  }

  constructor() { }
}
