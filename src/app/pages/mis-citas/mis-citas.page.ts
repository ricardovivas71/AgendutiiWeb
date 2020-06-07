import { Component, OnInit } from '@angular/core';
import { CitasModel } from 'src/app/models/citas/citas.model';
import { ConsultarCitasDtoModel } from 'src/app/models/citas/consultarCitasDto.model';

import { ToastController } from '@ionic/angular';

import { CitasService } from 'src/app/providers/citas/citas.service';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

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

  constructor(private citasService:CitasService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.ConsultarCitas(1);
  }

  ConsultarCitas(idUsuario:number){
    let oObjeto: ConsultarCitasDtoModel = new ConsultarCitasDtoModel(idUsuario);
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

}
