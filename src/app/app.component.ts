import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuItem } from './shared/models/menu-item.model';
import { faHorse, faDumbbell, faClipboardList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  menuItems: MenuItem[] = [
    {
      title: 'Horses',
      link: '/horse-list',
      icon: faHorse
    }, {
      title: 'Exercises',
      link: '/exercise-list',
      icon: faDumbbell
    }, {
      title: 'Exercise Log',
      link: '/exercise-log-list',
      icon: faClipboardList
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
