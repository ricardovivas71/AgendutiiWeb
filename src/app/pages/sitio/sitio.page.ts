import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizacionModel } from 'src/app/models/home/localizacion.model';
import { BarrioModel } from 'src/app/models/home/barrio.model';

import { HomeService } from 'src/app/providers/home/home.service';
import { VariablesGlobalesService } from 'src/app/providers/VariablesGlobales/variables-globales.service';
import { busquedaDTOModel } from 'src/app/models/home/busquedaDTO.model';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-sitio',
  templateUrl: './sitio.page.html',
  styleUrls: ['./sitio.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('200ms', [animate('400ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ],
})
export class SitioPage implements OnInit {

  items: any;
  listaCiudades: LocalizacionModel[] = [];
  listaBarrios: BarrioModel[] = [];
  tituloPagina:string;
  idCiudadBarrio:number = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private homeService: HomeService,
    private globalesService:VariablesGlobalesService,
    private router: Router,) { }

  ngOnInit() {
    this.tituloPagina = this.activatedRoute.snapshot.paramMap.get('titulo');
    this.idCiudadBarrio = parseInt(this.activatedRoute.snapshot.paramMap.get('idCiudad'));
    if(this.tituloPagina == "Buscar barrios"){
      this.obtenerBarrios();
    }else{
      this.obtenerCiudades();
    }
  }

  obtenerCiudad(ciudades: any) {
    this.inicializarLista();
    let ciudadSeleccionada = ciudades.target.value;

    if (ciudadSeleccionada && ciudadSeleccionada.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(ciudadSeleccionada.toLowerCase()) > -1);
      })
    }
  }

  obtenerCiudades(){
    this.homeService.consultarLocalizacion().subscribe(resultado => {
      console.log("RESULTADO CIUDADES",resultado);
      if (resultado.codigo == 1) {
        this.listaCiudades = resultado.respuesta as LocalizacionModel[];
        this.inicializarLista();
      } else {
        console.log("ERROR LISTA CIU", resultado);
      }
    });    
  }

  obtenerBarrios(){
    let oBusqueda = new busquedaDTOModel(this.idCiudadBarrio);
    console.log("Modelo consultar barrios",oBusqueda);
    this.homeService.consultarBarrios(oBusqueda).subscribe(resultado =>{
      console.log("Resultado barrios",resultado);
      if(resultado.codigo == 1){
        resultado.respuesta.forEach(element => {
          this.listaBarrios.push(new BarrioModel(element));
          this.inicializarLista();
        });
      }else{
        console.log("ERROR CONSULTANDO BARRIOS",resultado);
      }
    });
  }

  inicializarLista() {
    if(this.tituloPagina == "Buscar ciudades"){
      this.items = this.listaCiudades;
    }else{
      this.items = this.listaBarrios;
    }
  }

  ciudadSeleccionada(objetoSeleccionado: any) {
    if(this.tituloPagina == "Buscar ciudades"){
      this.globalesService.ciudadSeleccionada = objetoSeleccionado;
      console.log("Ciudad seleccionada", this.globalesService.ciudadSeleccionada);
      this.router.navigate(['/home',{ciudadSeleccionada: JSON.stringify(objetoSeleccionado)}]);
    }else{
      console.log("Barrio Seleccionado", objetoSeleccionado);
      this.globalesService.barrioSeleccionado = objetoSeleccionado;
      console.log("glabeles", this.globalesService.ciudadSeleccionada);
      this.router.navigate(['/home',{barrioSeleccionado: JSON.stringify(objetoSeleccionado),ciudadSeleccionada: JSON.stringify(this.globalesService.ciudadSeleccionada)}]);
    }
  }

  onCancel() {
    this.inicializarLista();
  }

}
