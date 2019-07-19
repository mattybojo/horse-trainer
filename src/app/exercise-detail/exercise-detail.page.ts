import { LoadingService } from './../shared/services/loading.service';
import { ExerciseService } from './../shared/services/exercise.service';
import { Component } from '@angular/core';
import { Exercise } from '../shared/models/exercise.model';
import { NavDataService } from '../shared/services/nav-data.service';
import { NavController } from '@ionic/angular';
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss']
})
export class ExerciseDetailPage {

  exercise: Exercise = new Exercise();
  _exercise: Exercise = new Exercise();
  pageType: string;
  disabled = true;

  constructor(private navCtrl: NavController, private navDataService: NavDataService,
    private exerciseService: ExerciseService, private loadingService: LoadingService) { }

  ionViewWillEnter() {
    this.pageType = this.navDataService.getRouteParamValue('pageType');

    switch (this.pageType) {
      case 'view':
        this._exercise = this.navDataService.getRouteParamValue('exercise');
        this.exercise = cloneDeep(this._exercise);
        this.disabled = true;
        break;
      case 'edit':
        this._exercise = this.navDataService.getRouteParamValue('exercise');
        this.exercise = cloneDeep(this._exercise);
        this.disabled = false;
        break;
      case 'add':
        this.disabled = false;
        break;
    }
  }

  onSubmit() {
    let dbObservable: Observable<any>;
    this.loadingService.present('Saving the exercise...');
    if (this.pageType === 'add') {
      dbObservable = this.exerciseService.addExercise(this.exercise);
    } else {
      dbObservable = this.exerciseService.updateExercise(this.exercise);
    }

    dbObservable.subscribe(() => {
      this.loadingService.dismiss();
      this.navCtrl.navigateBack('/exercise-list');
    }, (err) => {
      // TODO: More robust error handling
      console.log('Unable to save the exercise...');
      this.loadingService.dismiss();
    });
  }

  onEditClick() {
    this.navDataService.updateRouteParam('pageType', 'edit');
    this.pageType = this.navDataService.getRouteParamValue('pageType');
    this.disabled = false;
  }

  onBackClick() {
    this.navCtrl.navigateBack('/exercise-list');
  }
}
