import { Component, OnInit } from '@angular/core';
import { RouteParam } from '../shared/models/route-param.model';
import { NavController } from '@ionic/angular';
import { NavDataService } from '../shared/services/nav-data.service';
import { HorseService } from '../shared/services/horse.service';
import { Horse } from '../shared/models/horse.model';

@Component({
  selector: 'app-horses',
  templateUrl: './horse-list.page.html',
  styleUrls: ['./horse-list.page.scss'],
})
export class HorseListPage implements OnInit {

  horses: Horse[];

  constructor(public navCtrl: NavController, private navDataService: NavDataService, private horseService: HorseService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.horses = this.horseService.horses;
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
    this.horseService.deleteHorse(horse);
    this.horses = this.horseService.horses;
  }

}
