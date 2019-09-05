import { firestore } from 'firebase/app';
import { DocumentReference } from '@angular/fire/firestore';

export class ExerciseMap {
    name: string;
    ref: DocumentReference;
}

export class HorseMap {
    name: string;
    ref: DocumentReference;
}

export class ExerciseLog {
    createdAt: firestore.Timestamp;
    exercise: ExerciseMap;
    horse: HorseMap;
    id: string;
    notes: string;
    time: number;

    constructor() {
        this.exercise = new ExerciseMap();
        this.horse = new HorseMap();
    }
}

export class DateLog {
    dateString: string;
    logs: ExerciseLog[];
}
