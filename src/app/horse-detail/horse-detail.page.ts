import { HorseService } from './../shared/services/horse.service';
import { Horse } from './../shared/models/horse.model';
import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { NavController } from '@ionic/angular';
import { NavDataService } from '../shared/services/nav-data.service';

@Component({
  selector: 'app-horse-detail',
  templateUrl: './horse-detail.page.html',
  styleUrls: ['./horse-detail.page.scss'],
})
export class HorseDetailPage implements OnInit {

  horse: Horse = new Horse();
  _horse: Horse = new Horse();
  pageType: string;
  disabled = true;

  constructor(private navCtrl: NavController, private navDataService: NavDataService, private horseService: HorseService) { }

  ngOnInit() {}

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
    if (this.pageType === 'add') {
      this.horseService.addHorse(this.horse);
    } else {
      this.horseService.updateHorse(this.horse);
    }

    this.navCtrl.navigateBack('/horse-list');
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
