import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { TranslateProvider } from '../../providers';
import { LoginModel } from 'src/app/models/usuario/LoginModel';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UsuarioService } from 'src/app/providers/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private router: Router,
    public loginUsuario: UsuarioService,
    private storage: Storage
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'celular': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: this.translate.get('app.pages.login.label.forgot'),
      message: this.translate.get('app.pages.login.text.forgot'),
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: this.translate.get('app.label.email')
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: this.translate.get('app.pages.login.text.sended'),
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  goToHome() {
    let loginUsuario = new LoginModel(
      this.onLoginForm.get('celular').value,
      this.onLoginForm.get('password').value
    );

    this.loginUsuario.loginUsuario(loginUsuario).subscribe(async resultado =>{
      console.log(resultado,'RESPUESTA SERVICIO');
      if(resultado.codigo == "1"){
        this.storage.set('idUsuario', resultado.respuesta);
        const toast = await this.toastController.create({
          message: 'Bienvenido a Agendutti',
          duration: 2000
        });
        toast.present();
          this.router.navigate(['/home']);
      }else{
        const toast = await this.toastController.create({
          message: 'Ups! credenciales incorrectas, intenta nuevamente',
          duration: 2000
        });
        toast.present();
      }}
    );
  }

}
