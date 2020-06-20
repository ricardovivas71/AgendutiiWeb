import { Component, OnInit } from '@angular/core';
import { GestionarEmpleadosPage } from '../gestionar-empleados/gestionar-empleados.page';
import { ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GestionarEmpleadosService } from 'src/app/providers/gestionarEmpleados/gestionar-empleados.service';
import { ConsultarEmpleadosDtoModel } from 'src/app/models/empleados/consultarEmpleadosDto';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { EmpleadosModel } from 'src/app/models/empleados/empleados';

@Component({
  selector: 'app-mis-empleados',
  templateUrl: './mis-empleados.page.html',
  styleUrls: ['./mis-empleados.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('200ms', [animate('400ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ],
})
export class MisEmpleadosPage implements OnInit {

  public idEstablecimiento: number;
  public listaEmpleados:EmpleadosModel[] = [];

  constructor(public toastController: ToastController,
    public modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private empleadosService: GestionarEmpleadosService,
    private sanitizer: DomSanitizer,) { }

  ngOnInit() {
    this.consultarEmpleados(this.idEstablecimiento);
    this.idEstablecimiento = parseInt(this.activatedRoute.snapshot.paramMap.get('idEstablecimiento'));
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: GestionarEmpleadosPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'idEstablecimiento': this.idEstablecimiento
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        this.consultarEmpleados(this.idEstablecimiento);
    });

    return await modal.present();
  }

  consultarEmpleados(idEstablecimiento){
    let oEmpleados = new ConsultarEmpleadosDtoModel(idEstablecimiento);
    this.empleadosService.consultarEmpleados(oEmpleados).subscribe(async resultado =>{
      if(resultado.codigo == "1"){
        resultado.respuesta.forEach(element => {
          let empleado = new EmpleadosModel();
          empleado.idEmpleado = element.idEmpleado;
          empleado.nombres = element.nombres;
          empleado.apellidos = element.apellidos;
          empleado.imagen = this.sanitizer.bypassSecurityTrustResourceUrl(element.imagen);
        });
      }else{
        const toast = await this.toastController.create({
          message: 'Error consultando empleados',
          duration: 2000
        });
        toast.present();
      }
    });
  }

}
