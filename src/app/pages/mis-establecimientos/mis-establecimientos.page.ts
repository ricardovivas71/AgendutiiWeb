import { Component, OnInit } from '@angular/core';
import { GestionarEstablecimientoService } from 'src/app/providers/gestionar-establecimientos/gestionar-establecimiento.service';
import { EstablecimientoModel } from 'src/app/models/establecimientos/establecimiento.model';
import { DomSanitizer } from '@angular/platform-browser';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { MisEstablecimientoModel } from 'src/app/models/establecimientos/misEstablecimientos.model';
import { MisEstablecimientoModelDto } from 'src/app/models/establecimientos/MisEstablecimientosDTO.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mis-establecimientos',
  templateUrl: './mis-establecimientos.page.html',
  styleUrls: ['./mis-establecimientos.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('200ms', [animate('400ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ],
})
export class MisEstablecimientosPage implements OnInit {

  listaEstablecimientos: MisEstablecimientoModel[] = [];
  items: any;
  constructor(private gestionarEstService: GestionarEstablecimientoService,
              private sanitizer: DomSanitizer,
              private router: Router,) { }

  ngOnInit() {
    this.consultarMisEstablecimientos();

  }

  consultarMisEstablecimientos(){
    let misEstablecimientos = new MisEstablecimientoModelDto(1);
    this.gestionarEstService.consultarMisEstablecimientos(misEstablecimientos).subscribe(resultado =>{
      if(resultado.codigo == 1){
        resultado.respuesta.forEach(element => {
          let misEstablecimientos = new MisEstablecimientoModel();
          misEstablecimientos.idEstablecimiento = element.idEstablecimiento;
          misEstablecimientos.idCategoriaEst = element.idCategoriaEst;
          misEstablecimientos.nombreCategoria = element.nombreCategoria;
          misEstablecimientos.nombre = element.nombre;
          misEstablecimientos.direccion = element.direccion;
          misEstablecimientos.domicilios = element.domicilios;
          misEstablecimientos.imagen = this.sanitizer.bypassSecurityTrustResourceUrl(element.imagen);
          misEstablecimientos.barrio = element.barrio;
          misEstablecimientos.descripcion = element.descripcion;
          this.listaEstablecimientos.push(misEstablecimientos);
        });


        //this.listaEstablecimientos = resultado.respuesta as EstablecimientoModel[];
        this.inicializarLista();
        console.log("Resultado establecimientos",this.listaEstablecimientos);
      }else{
        console.log("Error consultando establecimientos",resultado);
      }
    });
  }

  obtenerEstablecimiento(establecimiento: any) {
    console.log("filtrando..", establecimiento.target.value);
    this.inicializarLista();
    let establecimientoSeleccionado = establecimiento.target.value;
    console.log("items..", this.items);
    if (establecimientoSeleccionado && establecimientoSeleccionado.trim() != '') {
      console.log("probando..");
      this.items = this.items.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(establecimientoSeleccionado.toLowerCase()) > -1);
      })
      console.log("despues", this.items);
    }
  }

  inicializarLista() {
    this.items = this.listaEstablecimientos;
  }

  onCancel() {
    this.inicializarLista();
  }

  registrarServicio(establecimiento){
    this.router.navigate(['/servicios-establecimiento',{ idEstablecimiento: establecimiento.idEstablecimiento}]);
  }

  registrarEmpleados(establecimiento){
    this.router.navigate(['/mis-empleados',{idEstablecimiento: establecimiento.idEstablecimiento}]);
  }

}
