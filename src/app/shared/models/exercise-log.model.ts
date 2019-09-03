import { firestore } from 'firebase';
import { DocumentReference } from '@angular/fire/firestore';

export class ExerciseLog {
    createdAt: firestore.Timestamp;
    exercise: ExerciseMap;
    horse: HorseMap;
    id: string;
    notes: string;
    time: number;
}

export class ExerciseMap {
    name: string;
    ref: DocumentReference;
}

export class HorseMap {
    name: string;
    ref: DocumentReference;
}

export class DateLog {
    dateString: string;
    logs: ExerciseLog[];
}
