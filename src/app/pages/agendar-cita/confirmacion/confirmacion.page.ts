import { Component, OnInit, Input, Inject, LOCALE_ID } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { EmpleadosModel } from 'src/app/models/agendar/empleados.model';
import { ServiciosModel } from 'src/app/models/agendar/servicios.model';
import { AgendarCitaModel } from 'src/app/models/agendar/agendarCita.model';
import { DatePipe } from '@angular/common';
import { Constantes } from 'src/app/Utils/constantes';
import { AgendarService } from 'src/app/providers/agendar/agendar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {

  @Input() fechaInicioCita: Date;
  @Input() colaboradorSeleccionado: EmpleadosModel;
  @Input() servicioSeleccionado: ServiciosModel;
  @Input() horaSeleccionada: Date;

  constructor(private modalCtrk:ModalController,
    @Inject(LOCALE_ID) private locale: string,
    private agendarService: AgendarService,
    public toastController: ToastController,
    private router: Router,) { }

  ngOnInit() {
    console.log("fechaInicioCita",this.fechaInicioCita);
    console.log("colaboradorSeleccionado",this.colaboradorSeleccionado);
    console.log("servicioSeleccionado",this.servicioSeleccionado);
    console.log("horaSeleccionada",this.horaSeleccionada);
  }

  AgendarCita(){
    //const fechaInicioCita = new Date(this.fechaSeleccionada != undefined ? this.fechaSeleccionada : this.fechaActual);
    this.fechaInicioCita.setHours(this.horaSeleccionada.getHours());
    this.fechaInicioCita.setMinutes(this.horaSeleccionada.getMinutes());
    this.fechaInicioCita.setSeconds(0);
    
    const duracionServicioCita = this.servicioSeleccionado.tiempoAtencion * 60 * 1000;
    const fechaFinCita = this.fechaInicioCita.getTime() + duracionServicioCita;
    let observacion = "Cita prueba";
    let idusuario = 1;
    let idEmpleado = this.colaboradorSeleccionado.idEmpleado;

    let oAgendarCita = new AgendarCitaModel(
      new DatePipe(this.locale).transform(this.fechaInicioCita, Constantes.formatoFechaLargo, this.locale),
      new DatePipe(this.locale).transform(fechaFinCita, Constantes.formatoFechaLargo, this.locale),
      observacion,
      idusuario,
      idEmpleado
    );
    console.log("MODELO AGENDAR",oAgendarCita);
    this.agendarService.agendarCita(oAgendarCita).subscribe(async resultado =>{
      if(resultado.codigo == 1){
        const toast = await this.toastController.create({
          message: 'Cita agendada con exito!',
          duration: 2000
        });
        toast.present();
        this.modalCtrk.dismiss();
        this.router.navigate(['/mis-citas']);
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
