import { ExerciseService } from './../shared/services/exercise.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Exercise } from '../shared/models/exercise.model';
import { NavDataService } from '../shared/services/nav-data.service';
import { NavController } from '@ionic/angular';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss']
})
export class ExerciseDetailPage implements OnInit {

  exercise: Exercise = new Exercise();
  _exercise: Exercise = new Exercise();
  pageType: string;
  disabled = true;

  constructor(private navCtrl: NavController, private navDataService: NavDataService, private exerciseService: ExerciseService) { }

  ngOnInit() {}

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
    if (this.pageType === 'add') {
      this.exerciseService.addExercise(this.exercise);
    } else {
      this.exerciseService.updateExercise(this.exercise);
    }

    this.navCtrl.navigateBack('/exercise-list');
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
