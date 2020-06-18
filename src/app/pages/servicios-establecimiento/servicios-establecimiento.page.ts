import { Component, OnInit } from '@angular/core';
import { ConsultarServiciosDtoModel } from 'src/app/models/servicios/consultarServiciosDto.mode';
import { GestionarEstablecimientoService } from 'src/app/providers/gestionar-establecimientos/gestionar-establecimiento.service';
import { ServiciosModel } from 'src/app/models/agendar/servicios.model';
import { ToastController, ModalController } from '@ionic/angular';
import { RegistrarServicioPage } from '../registrar-servicio/registrar-servicio.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicios-establecimiento',
  templateUrl: './servicios-establecimiento.page.html',
  styleUrls: ['./servicios-establecimiento.page.scss'],
})
export class ServiciosEstablecimientoPage implements OnInit {

  public listServicios: ServiciosModel[] = [];
  public idEstablecimiento: number;

  constructor(private gestionarService:GestionarEstablecimientoService,
    public toastController: ToastController,
    public modalController: ModalController,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.idEstablecimiento = parseInt(this.activatedRoute.snapshot.paramMap.get('idEstablecimiento'));
    this.consultarServicios(this.idEstablecimiento);
  }

  consultarServicios(idEstablecimiento){
    let oObjeto = new ConsultarServiciosDtoModel();
    oObjeto.idEstablecimiento = idEstablecimiento;

    this.gestionarService.consultarServicios(oObjeto).subscribe(async resultado =>{
      if(resultado.codigo == 1){
        this.listServicios = resultado.respuesta as ServiciosModel[];
      }else{
        const toast = await this.toastController.create({
          message: 'Error consultando los servicios del establecimiento',
          duration: 2000
        });
        toast.present();
      }
    },async error =>{
      const toast = await this.toastController.create({
        message: 'Error consultando los servicios del establecimiento',
        duration: 2000
      });
      toast.present();
    });

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: RegistrarServicioPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'idEstablecimiento': this.idEstablecimiento
      }
    });
    return await modal.present();
  }

}
