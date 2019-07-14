import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Exercise } from '../shared/models/exercise.model';
import { NavDataService } from '../shared/services/nav-data.service';
import { RouteParam } from '../shared/models/route-param.model';
import { ExerciseService } from '../shared/services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercise-list.page.html',
  styleUrls: ['./exercise-list.page.scss'],
})
export class ExerciseListPage implements OnInit {

  exercises: Exercise[];

  constructor(public navCtrl: NavController, private navDataService: NavDataService, private exerciseService: ExerciseService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.exercises = this.exerciseService.exercises;
  }

  addExercise() {
    const params: RouteParam[] = [];
    params.push({key: 'pageType', value: 'add'});
    this.navDataService.routeParams = params;
    this.navCtrl.navigateForward('/exercise-detail');
  }

  viewExercise(exercise: Exercise) {
    const params: RouteParam[] = [];
    params.push({key: 'pageType', value: 'view'});
    params.push({key: 'exercise', value: exercise});
    this.navDataService.routeParams = params;
    this.navCtrl.navigateForward('/exercise-detail');
  }

  deleteExercise(exercise: Exercise) {
    this.exerciseService.deleteExercise(exercise);
    this.exercises = this.exerciseService.exercises;
  }

}
