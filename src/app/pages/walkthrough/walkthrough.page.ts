import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, IonSlides, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})

export class WalkthroughPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  showSkip = true;
  slideOpts = {
    effect: 'flip',
    speed: 1000
  };
  dir: String = 'ltr';

  slideList: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public router: Router,
    private storage: Storage,
  ) {
    this.menuCtrl.enable(false);
  }

  ionViewWillEnter() {
  }

  ngOnInit() {
    this.storage.get('idUsuario').then((val) => {
      console.log('Usuario Login', val);
      if(val != 0 && val != null){
        this.router.navigate(['/home']);
      }else{
        this.slideList = [
          {
            title: 'Qué es <strong><span class="text-tertiary">Agendutti</strong>?',
            description: 'Es una aplicación móvil que te permite agendar tu cita en peluquerías, barberías o spa de uñas!',
            image: 'assets/img/Agendutti.png',
          },
          {
            title: 'Tienes un <strong><span class="text-tertiary">Negocio</span></strong>?',
            description: 'Registra gratis tu peluquería, barbería o spa de uñas!',
            image: 'assets/img/business01.png',
          },
          {
            title: '<strong>Agendutti es gratis</strong>',
            description: 'Se acabaron las filas, agenda tu cita ahora!',
            image: 'assets/img/rent01.png',
          }
        ];
      }
    });
    
    

  }

  onSlideNext() {
    this.slides.slideNext(1000, false);
  }

	onSlidePrev() {
    this.slides.slidePrev(300);
  }

  // onLastSlide() {
  // 	this.slides.slideTo(3, 300)
  // }

  // openHomeLocation() {
  //   this.navCtrl.navigateRoot('/home-location');
  //   // this.router.navigateByUrl('/tabs/(home:home)');
  // }

  openHome() {
    this.navCtrl.navigateRoot('/home');
    // this.router.navigateByUrl('/tabs/(home:home)');
  }

  openLoginPage() {
    this.navCtrl.navigateForward('/login');
  }

}