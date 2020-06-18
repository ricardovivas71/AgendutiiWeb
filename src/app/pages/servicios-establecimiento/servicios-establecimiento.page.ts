import { Component, OnInit } from '@angular/core';
import { ConsultarServiciosDtoModel } from 'src/app/models/servicios/consultarServiciosDto.mode';
import { GestionarEstablecimientoService } from 'src/app/providers/gestionar-establecimientos/gestionar-establecimiento.service';
import { ServiciosModel } from 'src/app/models/agendar/servicios.model';
import { ToastController, ModalController } from '@ionic/angular';
import { RegistrarServicioPage } from '../registrar-servicio/registrar-servicio.page';
import { ActivatedRoute } from '@angular/router';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { EliminarServiciosDtoModel } from 'src/app/models/servicios/eliminarServiciosDto.model';

@Component({
  selector: 'app-servicios-establecimiento',
  templateUrl: './servicios-establecimiento.page.html',
  styleUrls: ['./servicios-establecimiento.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('200ms', [animate('400ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ],
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

  eliminarServicio(event){
    console.log("eliminar servicio",event);
    let  oObjeto = new EliminarServiciosDtoModel(event.idServicio);
    this.gestionarService.eliminarServicio(oObjeto).subscribe(async resultado =>{
      if(resultado.codigo == 1){
        const toast = await this.toastController.create({
          message: 'Servicio eliminado correctamente',
          duration: 2000
        });
        toast.present();
        this.consultarServicios(this.idEstablecimiento);
      }else{
        const toast = await this.toastController.create({
          message: 'Ups! Error eliminando el servicio',
          duration: 2000
        });
        toast.present();
      }
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

    modal.onDidDismiss()
      .then((data) => {
        this.consultarServicios(this.idEstablecimiento);
    });

    return await modal.present();
  }

}
