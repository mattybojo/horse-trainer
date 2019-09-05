import { ExerciseService } from '../shared/services/exercise.service';
import { ExerciseLog, DateLog } from '../shared/models/exercise-log.model';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExerciseLogService } from '../shared/services/exercise-log.service';
import { LoadingService } from '../shared/services/loading.service';
import { first, finalize } from 'rxjs/operators';
import { HorseService } from '../shared/services/horse.service';
import { Horse } from '../shared/models/horse.model';
import { Exercise } from '../shared/models/exercise.model';
import * as _ from 'lodash';
import { RouteParam } from '../shared/models/route-param.model';
import { NavController } from '@ionic/angular';
import { NavDataService } from '../shared/services/nav-data.service';

@Component({
  selector: 'app-exercise-log-list',
  templateUrl: './exercise-log-list.page.html',
  styleUrls: ['./exercise-log-list.page.scss'],
})
export class ExerciseLogListPage {

  horses$: Observable<Horse[]>;
  exercises$: Observable<Exercise[]>;
  dateExerciseLogs$: Observable<DateLog[]>;
  data$: Observable<any>;
  loading: boolean;
  selectedHorse: Horse;

  constructor(private horseService: HorseService, private exerciseService: ExerciseService,
    private exerciseLogService: ExerciseLogService, private loadingService: LoadingService,
    public navCtrl: NavController, private navDataService: NavDataService) {}

  ionViewWillEnter() {
    this.loadingService.present('Loading data...');
    this.selectedHorse = this.navDataService.getRouteParamValue('exerciseLogHorse');
    this.loadHorses();
  }

  loadHorses() {
    this.horses$ = this.horseService
      .loadAllHorses()
      .pipe(
        first(),
        finalize(() => this.loadingService.dismiss())
      );
  }

  formatLogsByDate(items: ExerciseLog[]): Observable<DateLog[]> {
    const dateLogs: DateLog[] = [];

    const newItems = _.groupBy(items, item => item.createdAt.toDate().toLocaleDateString('en-US'));

    Object.keys(newItems).forEach(key => dateLogs.push({ dateString: key, logs: newItems[key] }));

    return of(_.orderBy(dateLogs, ['dateString'], ['desc']));
  }

  addExerciseLog() {
    const params: RouteParam[] = [];
    params.push({key: 'pageType', value: 'add'});
    params.push({key: 'horse', value: this.selectedHorse});
    this.navDataService.routeParams = params;
    this.navCtrl.navigateForward('/exercise-log-detail');
  }

  viewExerciseLog(exerciseLog: ExerciseLog) {
    const params: RouteParam[] = [];
    params.push({key: 'pageType', value: 'view'});
    params.push({key: 'exerciseLog', value: exerciseLog});
    params.push({key: 'horse', value: this.selectedHorse});
    this.navDataService.routeParams = params;
    this.navCtrl.navigateForward('/exercise-log-detail');
  }

  deleteExerciseLog(exerciseLog: ExerciseLog) {
    this.loadingService.present(`Deleting "${exerciseLog.exercise.name}"...`);
    this.exerciseLogService.deleteExerciseLog(exerciseLog).subscribe(() => {
      this.onHorseSelected();
      this.loadingService.dismiss();
    }, (err) => {
      // TODO: More robust error handling
      console.log('Unable to delete...');
      this.loadingService.dismiss();
    });
  }

  onHorseSelected() {
    this.loadingService.present('Loading data...');

    this.exerciseLogService
      .getHorseLogs(this.selectedHorse)
      .subscribe((logs) => {
        this.dateExerciseLogs$ = this.formatLogsByDate(logs);
        this.loadingService.dismiss();
      });
  }
}
