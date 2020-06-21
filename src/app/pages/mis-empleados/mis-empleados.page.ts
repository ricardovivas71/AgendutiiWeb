import { Component, OnInit } from '@angular/core';
import { GestionarEmpleadosPage } from '../gestionar-empleados/gestionar-empleados.page';
import { ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GestionarEmpleadosService } from 'src/app/providers/gestionarEmpleados/gestionar-empleados.service';
import { ConsultarEmpleadosDtoModel } from 'src/app/models/empleados/consultarEmpleadosDto';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { EmpleadosModel } from 'src/app/models/empleados/empleados';
import { EliminarEmpleadoDto } from 'src/app/models/empleados/eliminarEmpleadoDto';

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
    this.idEstablecimiento = parseInt(this.activatedRoute.snapshot.paramMap.get('idEstablecimiento'));
    this.consultarEmpleados(this.idEstablecimiento);
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
    this.listaEmpleados = [];
    let oEmpleados = new ConsultarEmpleadosDtoModel(idEstablecimiento);
    this.empleadosService.consultarEmpleados(oEmpleados).subscribe(async resultado =>{
      
      if(resultado.codigo == "1"){
        resultado.respuesta.forEach(element => {
          let empleado = new EmpleadosModel();
          empleado.idEmpleado = element.idEmpleado;
          empleado.nombres = element.nombres;
          empleado.apellidos = element.apellidos;
          empleado.imagen = element.imagen != "" ? this.sanitizer.bypassSecurityTrustResourceUrl(element.imagen) : "";

          this.listaEmpleados.push(empleado);

        });
        console.log("Lista Empleados",this.listaEmpleados);
      }else{
        const toast = await this.toastController.create({
          message: 'Error consultando colaboradores',
          duration: 2000
        });
        toast.present();
      }
    });
  }

  eliminarEmpleado(empleado){
    let oEmpleado = new EliminarEmpleadoDto(empleado.idEmpleado);
    this.empleadosService.eliminarEmpleado(oEmpleado).subscribe(async resultado =>{
      if(resultado.codigo == "1"){
        this.consultarEmpleados(this.idEstablecimiento);
        const toast = await this.toastController.create({
          message: 'Colaborador eliminado con éxito',
          duration: 2000
        });
        toast.present();
      }else{
        const toast = await this.toastController.create({
          message: 'Ups! Error eliminando el colaborador',
          duration: 2000
        });
        toast.present();
      }
    });
  }

}
