import { ExerciseLog } from './../shared/models/exercise-log.model';
import { Component } from '@angular/core';
import { cloneDeep } from 'lodash';
import { ExerciseLogService } from '../shared/services/exercise-log.service';
import { NavController } from '@ionic/angular';
import { NavDataService } from '../shared/services/nav-data.service';
import { LoadingService } from '../shared/services/loading.service';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { RouteParam } from '../shared/models/route-param.model';

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

  constructor(private navCtrl: NavController, private navDataService: NavDataService,
    private exerciseLogService: ExerciseLogService, private loadingService: LoadingService) { }

  ionViewWillEnter() {
    this.pageType = this.navDataService.getRouteParamValue('pageType');

    switch (this.pageType) {
      case 'view':
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
        this.disabled = false;
        break;
    }
  }

  // TODO: Test to make sure the proper values are getting sent to the backend
  onSubmit() {
    let dbObservable: Observable<any>;
    this.exerciseLog.createdAt = firestore.Timestamp.fromDate(new Date(this.formattedDate));
    this.loadingService.present('Saving the exercise...');
    if (this.pageType === 'add') {
      dbObservable = this.exerciseLogService.addExerciseLog(this.exerciseLog);
    } else {
      dbObservable = this.exerciseLogService.updateExerciseLog(this.exerciseLog);
    }

    dbObservable.subscribe(() => {
      this.loadingService.dismiss();
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
    this.disabled = false;
  }

  onBackClick() {
    const params: RouteParam[] = [];
    params.push({key: 'exerciseLogHorse', value: this.exerciseLog.horse});
    this.navDataService.routeParams = params;
    this.navCtrl.navigateBack('/exercise-log-list');
  }
}
