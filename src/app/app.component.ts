import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateProvider } from './providers/translate/translate.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { Storage } from '@ionic/storage';

import { Pages } from './interfaces/pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;
  public nombreUsuario: string;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateProvider,
    private translateService: TranslateService,
    private storage: Storage,
    public router: Router
  ) {
    this.appPages = [
      {
        title: 'Agendar Cita',
        url: '/home',
        direct: 'root',
        icon: 'browsers'
      },
      {
        title: 'Mis Establecimientos',
        url: '/mis-establecimientos',
        direct: 'forward',
        icon: 'home'

      },
      // {
      //   title: 'Home Results',
      //   url: '/home-results',
      //   direct: 'root',
      //   icon: 'browsers'
      // },
      // {
      //   title: 'Home Location',
      //   url: '/home-location',
      //   direct: 'root',
      //   icon: 'browsers'
      // },
      // {
      //   title: 'Messages',
      //   url: '/messages',
      //   direct: 'forward',
      //   icon: 'mail'
      // },
      // {
      //   title: 'Properties',
      //   url: '/property-list',
      //   direct: 'forward',
      //   icon: 'home'
      // },
      // {
      //   title: 'Brokers',
      //   url: '/broker-list',
      //   direct: 'forward',
      //   icon: 'people'
      // },
      // {
      //   title: 'Nearby',
      //   url: '/nearby',
      //   direct: 'forward',
      //   icon: 'compass'
      // },
      // {
      //   title: 'By Category',
      //   url: '/bycategory',
      //   direct: 'forward',
      //   icon: 'albums'
      // },
      // {
      //   title: 'Invoices',
      //   url: '/invoices',
      //   direct: 'forward',
      //   icon: 'list-box'
      // },
      // {
      //   title: 'Favorites',
      //   url: '/favorites',
      //   direct: 'forward',
      //   icon: 'heart'
      // },
      // {
      //   title: 'About',
      //   url: '/about',
      //   direct: 'forward',
      //   icon: 'information-circle-outline'
      // },
      {
        title: 'Contacto',
        url: '/support',
        direct: 'forward',
        icon: 'help-buoy'
      },
      // {
      //   title: 'App Settings',
      //   url: '/settings',
      //   direct: 'forward',
      //   icon: 'cog'
      // },
      // {
      //   title: 'Walkthrough',
      //   url: '/',
      //   direct: 'root',
      //   icon: 'photos'
      // },
      // {
      //   title: 'Extras',
      //   url: '/extras',
      //   direct: 'forward',
      //   icon: 'paper'
      // }
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.storage.get('nombreUsuario').then((val) => {
      console.log('NOMBRE Login', val);
      if(val != '' && val != null){
        this.nombreUsuario = val;
      }else{
      this.nombreUsuario = null;
    }
    });

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
      // this.splashScreen.hide();
      // Set language of the app.
      this.translateService.setDefaultLang(environment.language);
      this.translateService.use(environment.language);
      this.translateService.getTranslation(environment.language).subscribe(translations => {
        this.translate.setTranslations(translations);
      });
    }).catch(() => {
      // Set language of the app.
      this.translateService.setDefaultLang(environment.language);
      this.translateService.use(environment.language);
      this.translateService.getTranslation(environment.language).subscribe(translations => {
        this.translate.setTranslations(translations);
      });
    });
  }

  closeMenu() {
    this.storage.set('idUsuario', null);
    this.storage.set('nombreUsuario', null);
    this.menu.close();
  }

  // goToEditProgile() {
  //   this.router.navigateByUrl('/edit-profile');
  // }

  // logout() {
  //   this.router.navigateByUrl('/login');
  // }
}
