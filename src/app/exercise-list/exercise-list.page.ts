import { LoadingService } from './../shared/services/loading.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Exercise } from '../shared/models/exercise.model';
import { NavDataService } from '../shared/services/nav-data.service';
import { RouteParam } from '../shared/models/route-param.model';
import { ExerciseService } from '../shared/services/exercise.service';
import { Observable } from 'rxjs';
import { finalize, first } from 'rxjs/operators';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercise-list.page.html',
  styleUrls: ['./exercise-list.page.scss'],
})
export class ExerciseListPage {

  exercises$: Observable<Exercise[]>;
  loading: boolean;

  constructor(public navCtrl: NavController, private navDataService: NavDataService,
    private exerciseService: ExerciseService, private loadingService: LoadingService) { }

  ionViewWillEnter() {
    this.loadingService.present('Loading data...');

    this.loadExercises();
  }

  loadExercises() {
    this.exercises$ = this.exerciseService
    .loadAllExercises()
    .pipe(
      first(),
      finalize(() => this.loadingService.dismiss())
    );
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
    this.loadingService.present(`Deleting "${exercise.name}"...`);
    this.exerciseService.deleteExercise(exercise).subscribe(() => {
      this.loadExercises();
      this.loadingService.dismiss();
    }, (err) => {
      // TODO: More robust error handling
      console.log('Unable to delete...');
      this.loadingService.dismiss();
    });
  }

}
