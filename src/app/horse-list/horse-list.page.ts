import { LoadingService } from './../shared/services/loading.service';
import { Component } from '@angular/core';
import { RouteParam } from '../shared/models/route-param.model';
import { NavController } from '@ionic/angular';
import { NavDataService } from '../shared/services/nav-data.service';
import { HorseService } from '../shared/services/horse.service';
import { Horse } from '../shared/models/horse.model';
import { Observable } from 'rxjs';
import { finalize, first } from 'rxjs/operators';

@Component({
  selector: 'app-horses',
  templateUrl: './horse-list.page.html',
  styleUrls: ['./horse-list.page.scss'],
})
export class HorseListPage {

  horses$: Observable<Horse[]>;
  loading: boolean;

  constructor(public navCtrl: NavController, private navDataService: NavDataService,
    private horseService: HorseService, private loadingService: LoadingService) { }

  ionViewWillEnter() {
    // Only show the loading on the initial load of this page
    if (null == this.horses$) {
      this.loadingService.present('Loading data...');
    }
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

  addHorse() {
    const params: RouteParam[] = [];
    params.push({key: 'pageType', value: 'add'});
    this.navDataService.routeParams = params;
    this.navCtrl.navigateForward('/horse-detail');
  }

  viewHorse(horse: Horse) {
    const params: RouteParam[] = [];
    params.push({key: 'pageType', value: 'view'});
    params.push({key: 'horse', value: horse});
    this.navDataService.routeParams = params;
    this.navCtrl.navigateForward('/horse-detail');
  }

  deleteHorse(horse: Horse) {
    this.loadingService.present(`Deleting "${horse.name}"...`);
    this.horseService.deleteHorse(horse).subscribe(() => {
      this.loadHorses();
      this.loadingService.dismiss();
    }, (err) => {
      // TODO: More robust error handling
      console.log('Unable to delete...');
      this.loadingService.dismiss();
    });
  }

}
