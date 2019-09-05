import { Exercise } from './../shared/models/exercise.model';
import { Horse } from './../shared/models/horse.model';
import { HorseService } from './../shared/services/horse.service';
import { ExerciseLog } from './../shared/models/exercise-log.model';
import { Component } from '@angular/core';
import { cloneDeep } from 'lodash';
import { ExerciseLogService } from '../shared/services/exercise-log.service';
import { NavController } from '@ionic/angular';
import { NavDataService } from '../shared/services/nav-data.service';
import { LoadingService } from '../shared/services/loading.service';
import { Observable, forkJoin } from 'rxjs';
import { firestore } from 'firebase/app';
import { RouteParam } from '../shared/models/route-param.model';
import { ExerciseService } from '../shared/services/exercise.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-exercise-log-detail',
  templateUrl: './exercise-log-detail.page.html',
  styleUrls: ['./exercise-log-detail.page.scss'],
})
export class ExerciseLogDetailPage {

  exerciseLog: ExerciseLog = new ExerciseLog();
  _exerciseLog: ExerciseLog = new ExerciseLog();
  formattedDate: string;
  pageType: string;
  disabled = true;
  horseList: Horse[];
  exerciseList: Exercise[];
  horse: Horse;

  constructor(private navCtrl: NavController, private navDataService: NavDataService,
    private exerciseLogService: ExerciseLogService, private loadingService: LoadingService,
    private horseService: HorseService, private exerciseService: ExerciseService) { }

  ionViewWillEnter() {
    this.pageType = this.navDataService.getRouteParamValue('pageType');

    switch (this.pageType) {
      case 'view':
        this.horse = this.navDataService.getRouteParamValue('horse');
        this._exerciseLog = this.navDataService.getRouteParamValue('exerciseLog');
        this.exerciseLog = cloneDeep(this._exerciseLog);
        this.formattedDate = this.exerciseLog.createdAt.toDate().toISOString();
        this.disabled = true;
        break;
      case 'edit':
        this._exerciseLog = this.navDataService.getRouteParamValue('exerciseLog');
        this.exerciseLog = cloneDeep(this._exerciseLog);
        this.formattedDate = this.exerciseLog.createdAt.toDate().toISOString();
        this.disabled = false;
        break;
      case 'add':
        this.horse = this.navDataService.getRouteParamValue('horse');
        this.exerciseLog.horse.name = this.horse.name;
        this.loadHorseOptions();
        break;
    }
  }

  loadHorseOptions(): void {
    this.loadingService.present('Loading data...');
    const observableArray: Observable<any>[] = [];
    observableArray.push(this.horseService.loadAllHorses().pipe(first()));
    observableArray.push(this.exerciseService.loadAllExercises().pipe(first()));
    forkJoin(observableArray).subscribe((results) => {
      this.loadingService.dismiss();
      this.horseList = results[0];
      this.exerciseList = results[1];
      this.disabled = false;
    });
  }

  onSubmit() {
    const params: RouteParam[] = [];
    let dbObservable: Observable<any>;
    this.exerciseLog.createdAt = firestore.Timestamp.fromDate(new Date(this.formattedDate));

    // Get the ID for each object
    const horseId = this.getObjectId(this.horseList, this.exerciseLog.horse.name);
    const exerciseId = this.getObjectId(this.exerciseList, this.exerciseLog.exercise.name);

    this.loadingService.present('Saving the exercise...');
    if (this.pageType === 'add') {
      dbObservable = this.exerciseLogService.addExerciseLog(this.exerciseLog, horseId, exerciseId);
    } else {
      dbObservable = this.exerciseLogService.updateExerciseLog(this.exerciseLog, horseId, exerciseId);
    }

    dbObservable.subscribe(() => {
      this.loadingService.dismiss();
      params.push({key: 'exerciseLogHorse', value: this.horse});
      this.navDataService.routeParams = params;
      this.navCtrl.navigateBack('/exercise-log-list');
    }, (err) => {
      // TODO: More robust error handling
      console.log('Unable to save the exercise log...');
      this.loadingService.dismiss();
    });
  }

  onEditClick() {
    this.navDataService.updateRouteParam('pageType', 'edit');
    this.pageType = this.navDataService.getRouteParamValue('pageType');
    this.loadHorseOptions();
  }

  onBackClick() {
    const params: RouteParam[] = [];
    params.push({key: 'exerciseLogHorse', value: this.horse});
    this.navDataService.routeParams = params;
    this.navCtrl.navigateBack('/exercise-log-list');
  }

  private getObjectId(objArr: any[], objName: string): string {
    return objArr.find(x => x.name === objName).id;
  }
}
