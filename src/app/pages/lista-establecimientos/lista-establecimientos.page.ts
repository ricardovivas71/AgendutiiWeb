import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstablecimientoModel } from 'src/app/models/establecimientos/establecimiento.model';
import { Storage } from '@ionic/storage';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lista-establecimientos',
  templateUrl: './lista-establecimientos.page.html',
  styleUrls: ['./lista-establecimientos.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('200ms', [animate('400ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ],
})
export class ListaEstablecimientosPage implements OnInit {

  listaEstablecimientos: EstablecimientoModel[] = [];
  items: any;
  filtrando = false;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let lista = this.activatedRoute.snapshot.paramMap.get('lista');
    this.listaEstablecimientos = JSON.parse(lista);
    this.inicializarLista();
  }

  AgendarCita(establecimiento: EstablecimientoModel){
    this.storage.get('idUsuario').then((val) => {
      console.log('Usuario Login', val);
      if(val != 0 && val != null){
      this.router.navigate(['/agendar-cita',{id: establecimiento.idEstablecimiento, nombre:establecimiento.nombre}]);
      }else{
      this.router.navigate(['/login',{id: establecimiento.idEstablecimiento, nombre:establecimiento.nombre}]);
    }
    });
  }

  obtenerEstablecimiento(establecimiento: any) {
    this.filtrando = true;
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

    if(!this.filtrando)
    {
      this.listaEstablecimientos.forEach((element,index) =>{
        element.imagen = element.imagen != "" ? this.sanitizer.bypassSecurityTrustResourceUrl(element.imagen) : "";
      });
    }
    console.log("RESULTADO ESTABLECIMIENTOS",this.listaEstablecimientos);
    this.items = this.listaEstablecimientos;
  }

  onCancel() {
    this.inicializarLista();
  }
}
