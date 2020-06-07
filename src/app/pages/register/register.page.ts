import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController, ToastController } from '@ionic/angular';
import { RegistrarUsuarioModel } from 'src/app/models/usuario/RegistrarUsuarioModel';
import { UsuarioService } from 'src/app/providers/usuario/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    public registroUsuario: UsuarioService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'nombre': [null, Validators.compose([
        Validators.required
      ])],
      'apellido': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'telefono': [null, Validators.compose([
        Validators.required
      ])],
      'contrasena': [null, Validators.compose([
        Validators.required
      ])],
      'reContrasena': [null, Validators.compose([
        Validators.required
      ])],
      'tipoUsuario': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async signUp() {
      console.log(this.onRegisterForm.value,'DATOS REGISTRO');
      let registroUsuario = new RegistrarUsuarioModel(
        this.onRegisterForm.get('nombre').value,
        this.onRegisterForm.get('apellido').value,
        this.onRegisterForm.get('email').value,
        this.onRegisterForm.get('contrasena').value,
        this.onRegisterForm.get('telefono').value,
        this.onRegisterForm.get('tipoUsuario').value
      );
      
      // const loader = await this.loadingCtrl.create();
      // loader.present();
      this.registroUsuario.registrarUsuario(registroUsuario).subscribe(async resultado =>{
        console.log(resultado,'RESPUESTA SERVICIO');
        if(resultado.codigo == "1"){
          const toast = await this.toastController.create({
            message: 'Usuario '+resultado.respuesta + ' creado con exito',
            duration: 2000
          });
          toast.present();
        }else{
          const toast = await this.toastController.create({
            message: 'Ups! ha ocurrido un error, intenta nuevamente',
            duration: 2000
          });
          toast.present();
        }}
      );

      // loader.onWillDismiss().then(() => {
      //   this.navCtrl.navigateRoot('/home-location');
      //   });

  }

  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
