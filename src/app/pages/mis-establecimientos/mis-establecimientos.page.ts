import { Component, OnInit } from '@angular/core';
import { GestionarEstablecimientoService } from 'src/app/providers/gestionar-establecimientos/gestionar-establecimiento.service';
import { EstablecimientoModel } from 'src/app/models/establecimientos/establecimiento.model';


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

  listaEstablecimientos: EstablecimientoModel[] = [];
  items: any;
  constructor(private gestionarEstService: GestionarEstablecimientoService) { }

  ngOnInit() {
    this.consultarMisEstablecimientos();

  }

  consultarMisEstablecimientos(){
    let misEstablecimientos = new MisEstablecimientoModelDto(1);
    this.gestionarEstService.consultarMisEstablecimientos(misEstablecimientos).subscribe(resultado =>{
      if(resultado.codigo == 1){
        this.listaEstablecimientos = resultado.respuesta as EstablecimientoModel[];
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

}
