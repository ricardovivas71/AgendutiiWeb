import { Component, OnInit } from '@angular/core';
import { CitasModel } from 'src/app/models/citas/citas.model';
import { ConsultarCitasDtoModel } from 'src/app/models/citas/consultarCitasDto.model';
import { ToastController } from '@ionic/angular';
import { CitasService } from 'src/app/providers/citas/citas.service';
import { Storage } from '@ionic/storage';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { ActualizarEstadoCitaModel } from 'src/app/models/citas/actualizarEstado.model';
import { Constantes } from 'src/app/Utils/constantes';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.page.html',
  styleUrls: ['./mis-citas.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('200ms', [animate('400ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ],
})
export class MisCitasPage implements OnInit {

  listaCitas:CitasModel[] = [];
  idUsuario:number;

  constructor(private citasService:CitasService,
    public toastController: ToastController,
    private storage: Storage,) { }

  ngOnInit() {
    this.storage.get('idUsuario').then((val) => {
      this.idUsuario = val;
      this.ConsultarCitas(this.idUsuario);
    });
    
  }

  ConsultarCitas(idUsuario:number){
    let oObjeto: ConsultarCitasDtoModel = new ConsultarCitasDtoModel(idUsuario);
    console.log("MODELO MIS CITAS",oObjeto);
    this.citasService.consultarCitasPropias(oObjeto).subscribe(async resultado =>{
      if(resultado.codigo == "1"){
        if(resultado.respuesta.length > 0){
          this.listaCitas = resultado.respuesta as CitasModel[];
        }else{
          const toast = await this.toastController.create({
            message: 'No tienes citas registradas!',
            duration: 2000
          });
          toast.present();
        }
      }else{
        const toast = await this.toastController.create({
          message: 'Ups! ha ocurrido un error, intenta nuevamente',
          duration: 2000
        });
        toast.present();
      }
    });

  }

  cancelarCita(cita){
    let oObjeto = new ActualizarEstadoCitaModel();
    oObjeto.idCita = cita.idCita;
    oObjeto.idEstado = Constantes.idEstadoCancelada;

    this.citasService.gestionarCitas(oObjeto).subscribe(async result =>{
      if(result.codigo == "1"){
        this.ConsultarCitas(this.idUsuario);
        const toast = await this.toastController.create({
          message: 'La cita se ha cancelado con éxito',
          duration: 2000
        });
        toast.present();
      }else{
        const toast = await this.toastController.create({
          message: 'Ups! Error gestionando la cita',
          duration: 2000
        });
        toast.present();
      }
    });
  }

}
