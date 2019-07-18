import { LoadingService } from './../shared/services/loading.service';
import { HorseService } from './../shared/services/horse.service';
import { Horse } from './../shared/models/horse.model';
import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { NavController } from '@ionic/angular';
import { NavDataService } from '../shared/services/nav-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-horse-detail',
  templateUrl: './horse-detail.page.html',
  styleUrls: ['./horse-detail.page.scss'],
})
export class HorseDetailPage {

  horse: Horse = new Horse();
  _horse: Horse = new Horse();
  pageType: string;
  disabled = true;

  constructor(private navCtrl: NavController, private navDataService: NavDataService,
    private horseService: HorseService, private loadingService: LoadingService) { }

  ionViewWillEnter() {
    this.pageType = this.navDataService.getRouteParamValue('pageType');

    switch (this.pageType) {
      case 'view':
        this._horse = this.navDataService.getRouteParamValue('horse');
        this.horse = cloneDeep(this._horse);
        this.disabled = true;
        break;
      case 'edit':
        this._horse = this.navDataService.getRouteParamValue('horse');
        this.horse = cloneDeep(this._horse);
        this.disabled = false;
        break;
      case 'add':
        this.disabled = false;
        break;
    }
  }

  onSubmit() {
    let dbObservable: Observable<any>;
    this.loadingService.present('Saving the horse\'s data...');
    if (this.pageType === 'add') {
      dbObservable = this.horseService.addHorse(this.horse);
    } else {
      dbObservable = this.horseService.updateHorse(this.horse);
    }

    dbObservable.subscribe(() => {
      this.loadingService.dismiss();
      this.navCtrl.navigateBack('/horse-list');
    }, (err) => {
      // TODO: More robust error handling
      console.log('Unable to save the horse\'s data...');
      this.loadingService.dismiss();
    });
  }

  onEditClick() {
    this.navDataService.updateRouteParam('pageType', 'edit');
    this.pageType = this.navDataService.getRouteParamValue('pageType');
    this.disabled = false;
  }

  onBackClick() {
    this.navCtrl.navigateBack('/horse-list');
  }

}
