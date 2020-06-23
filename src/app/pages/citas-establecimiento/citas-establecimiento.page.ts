import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CitasEstablecimientoDtoModel } from 'src/app/models/citas/citasEstablecimientoDto.model';
import { ActivatedRoute } from '@angular/router';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { CitasService } from 'src/app/providers/citas/citas.service';
import { DatePipe } from '@angular/common';
import { Constantes } from 'src/app/Utils/constantes';
import { ConsultaCitasEstablecimientoModel } from 'src/app/models/citas/consultaCitasEstablecimiento.model';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { ActualizarEstadoCitaModel } from 'src/app/models/citas/actualizarEstado.model';

@Component({
  selector: 'app-citas-establecimiento',
  templateUrl: './citas-establecimiento.page.html',
  styleUrls: ['./citas-establecimiento.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('200ms', [animate('400ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ],
})
export class CitasEstablecimientoPage implements OnInit {

  public fechaConsulta: Date = new Date();
  public idEstablecimiento: number;
  public listaCitasEstablecimiento: ConsultaCitasEstablecimientoModel[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    public toastController: ToastController,
    private citasService: CitasService,
    public actionSheetController: ActionSheetController,
    @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.idEstablecimiento = parseInt(this.activatedRoute.snapshot.paramMap.get('idEstablecimiento'));
    console.log("Id Est", this.idEstablecimiento);
    this.consultarCitasEstablecimiento(this.fechaConsulta);
  }

  async presentActionSheet(cita) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Gestionar Cita',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Confirmar Cita',
        icon: 'checkmark-circle',
        handler: () => {
          this.gestionarCita(cita,Constantes.idEstadoConfirmada);
        }
      },
      {
        text: 'Rechazar Cita',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.gestionarCita(cita,Constantes.idEstadoRechazada);
        }
      }]
    });
    await actionSheet.present();
  }

  gestionarCita(cita,estado){
    let oObjeto = new ActualizarEstadoCitaModel();
    oObjeto.idCita = cita.idCita;
    oObjeto.idEstado = estado;

    this.citasService.gestionarCitas(oObjeto).subscribe(async result =>{
      if(result.codigo == "1"){
        this.consultarCitasEstablecimiento(this.fechaConsulta);
        const toast = await this.toastController.create({
          message: 'La cita se ha gestionado con éxito',
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

  obtenerFecha(event) {
    this.fechaConsulta = null;
    this.fechaConsulta = new Date(event.detail.value);
    console.log("Cambio Fecha", this.fechaConsulta);
    this.consultarCitasEstablecimiento(this.fechaConsulta);
  }

  consultarCitasEstablecimiento(fechaConsulta) {
    let oObjeto = new CitasEstablecimientoDtoModel(this.idEstablecimiento, new DatePipe(this.locale).transform(new Date(fechaConsulta), Constantes.formatoFechaLargo, this.locale));
    console.log("Objeto consulta", oObjeto);
    this.citasService.consultarCitasEstablecimiento(oObjeto).subscribe(async resultado => {
      if (resultado.codigo == "1") {
        this.listaCitasEstablecimiento = resultado.respuesta as ConsultaCitasEstablecimientoModel[];
      } else {
        const toast = await this.toastController.create({
          message: 'Ups! Error consultando las citas del establecimiento',
          duration: 2000
        });
        toast.present();
      }
    });
  }

}
