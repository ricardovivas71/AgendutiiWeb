import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TiempoAtencionModel } from 'src/app/models/servicios/tiempoAtencion.model';
import { RegistrarServicioModel } from 'src/app/models/servicios/registrarServicioDTO.model';
import { GestionarEstablecimientoService } from 'src/app/providers/gestionar-establecimientos/gestionar-establecimiento.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-servicio',
  templateUrl: './registrar-servicio.page.html',
  styleUrls: ['./registrar-servicio.page.scss'],
})
export class RegistrarServicioPage implements OnInit {

  formularioRegistro: FormGroup;
  listaTiempo: TiempoAtencionModel[] = [];
  @Input() idEstablecimiento: number;
  constructor(private formBuilder: FormBuilder,
    private gestionarEstService: GestionarEstablecimientoService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.llenarTiempoAtencion();
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      precio: ['', [Validators.required, Validators.min(2000)]],
      tiempo: ['', [Validators.required]]
    });
  }

  llenarTiempoAtencion(){
    this.listaTiempo.push(new TiempoAtencionModel("15 minutos",15));
    this.listaTiempo.push(new TiempoAtencionModel("30 minutos",30));
    this.listaTiempo.push(new TiempoAtencionModel("45 minutos",45));
    this.listaTiempo.push(new TiempoAtencionModel("1 hora",60));
    this.listaTiempo.push(new TiempoAtencionModel("1 hora 15 minutos",75));
    this.listaTiempo.push(new TiempoAtencionModel("1 hora 30 minutos",90));
    this.listaTiempo.push(new TiempoAtencionModel("1 hora 45 minutos",105));
    this.listaTiempo.push(new TiempoAtencionModel("2 horas",120));
    this.listaTiempo.push(new TiempoAtencionModel("2 horas 15 minutos",135));
    this.listaTiempo.push(new TiempoAtencionModel("2 horas 30 minutos",150));
    this.listaTiempo.push(new TiempoAtencionModel("2 horas 45 minutos",175));
    this.listaTiempo.push(new TiempoAtencionModel("3 horas",190));

  }

  RegistrarServicio(){
    console.log("Model servicio",this.formularioRegistro.value);

    let oModelRegistrar: RegistrarServicioModel = new RegistrarServicioModel(
      this.formularioRegistro.get('nombre').value,
      this.formularioRegistro.get('descripcion').value,
      parseInt(this.formularioRegistro.get('precio').value),
      parseInt(this.formularioRegistro.get('tiempo').value),
      this.idEstablecimiento
    );
    console.log(oModelRegistrar,"MODELO REGISTRAR");
    // this.router.navigate(['/mis-establecimientos']);
    this.gestionarEstService.registrarServicio(oModelRegistrar).subscribe(async resultado =>{
      if(resultado.codigo == 1){
        const toast = await this.toastController.create({
          message: 'Servicio registrado con éxito',
          duration: 2000
        });
        toast.present();
        console.log("ID Servicio..",resultado.respuesta)
      }else{
        const toast = await this.toastController.create({
          message: 'Error registrando el servicio',
          duration: 2000
        });
        toast.present();
      }
    });
  }

}
