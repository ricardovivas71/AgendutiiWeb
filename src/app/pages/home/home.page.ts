import { Component, OnInit } from '@angular/core';
import { TipoServiciosModel } from 'src/app/models/home/tipoServicios.model';
import { EstablecimientoModel } from 'src/app/models/establecimientos/establecimiento.model';
import { LocalizacionModel } from 'src/app/models/home/localizacion.model';
import { busquedaDTOModel } from 'src/app/models/home/busquedaDTO.model';
import { BuscarEstablecimientoModel } from 'src/app/models/establecimientos/buscarEstablecimientoDTO.model';

import { BarrioModel } from 'src/app/models/home/barrio.model';
import { HomeService } from 'src/app/providers/home/home.service';

import { NavController, MenuController, LoadingController } from '@ionic/angular';

import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { VariablesGlobalesService } from 'src/app/providers/VariablesGlobales/variables-globales.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  listaTipoServicios: TipoServiciosModel[] = [];
  listaEstablecimientos: EstablecimientoModel[] = [];

  ciudadSeleccionada: LocalizacionModel;
  barrioSeleccionado: BarrioModel;
  servicioSeleccionado: TipoServiciosModel;
  habilitarBusqueda:boolean = false;
  constructor(private homeService: HomeService,
              public navCtrl: NavController,
              public menuCtrl: MenuController,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private globalesService:VariablesGlobalesService) { }

  ngOnInit() {

    this.ciudadSeleccionada = JSON.parse(this.activatedRoute.snapshot.paramMap.get('ciudadSeleccionada'));
    this.barrioSeleccionado = JSON.parse(this.activatedRoute.snapshot.paramMap.get('barrioSeleccionado'));
    this.ConsultarDatosIniciales(1);
    this.funcionHabilitarBusqueda();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  funcionHabilitarBusqueda(){
    if(this.ciudadSeleccionada != undefined && (this.globalesService.idServicioSelccionado != 0 || this.servicioSeleccionado != null)){
      this.habilitarBusqueda = true;
    }
  }

  /*
  * Autor: Ricardo Vivas
  * Fecha: 24/Mayo/2020
  * Descripción: Obtiene la lista de departamentos
  */
  ConsultarDatosIniciales(idLocalizacion){
    let oBusqueda = new busquedaDTOModel(idLocalizacion);
    this.homeService.consultarTiposServicios(oBusqueda).subscribe(resultado =>{
      console.log("RESULTADO INICIAL",resultado);
      if(resultado.codigo == 1){
        this.listaTipoServicios = resultado.respuesta as TipoServiciosModel[];
        this.listaTipoServicios.forEach(element =>{
          if(element.nombre == "Peluquería"){
            element.imagen = "assets/icon/home.svg";
          }else if(element.nombre == "Barbería"){
            element.imagen = "assets/icon/barberia.svg";
          }else{
            element.imagen = "assets/icon/spaUnas.svg";
          }
        });
      }else{
        console.log("ERROR DATOS INICIALES", resultado);
      }
    });
  }

  editprofile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  /**
  * Autor: Ricardo Vivas
  * Fecha: 24/Mayo/2020
  * Descripción: Dirige a la pantalla de selecionar Ciudades
  */
  obtenerCiudad() {
    this.router.navigate(['/sitio',{ titulo: 'Buscar ciudades'}]);
  }

  /**
  * Autor: Ricardo Vivas
  * Fecha: 24/Mayo/2020
  * Descripción: Dirige a la pantalla de selccionar barrios
  */
  obtenerBarrio(){
    this.router.navigate(['/sitio',{titulo: 'Buscar barrios',idCiudad:this.ciudadSeleccionada.idLocalizacion}]);
  }

  seleccionarServicio(event){
    console.log("Servicio seleccionado",event.nombre);
    this.globalesService.idServicioSelccionado = event.idCategoriaEst;
    this.servicioSeleccionado = event;
    this.funcionHabilitarBusqueda();
  }

  BuscarSitios() {
    let buscarEstablecimiento = new BuscarEstablecimientoModel(
      this.ciudadSeleccionada.idLocalizacion,
      this.barrioSeleccionado != undefined ? this.barrioSeleccionado.nombre : "",
      this.globalesService.idServicioSelccionado
    );
    this.homeService.consultarEstablecimientos(buscarEstablecimiento).subscribe(resultado =>{
      if(resultado.codigo == 1){
        this.listaEstablecimientos = resultado.respuesta as EstablecimientoModel[];
        console.log("Resultado establecimientos",this.listaEstablecimientos);
        this.router.navigate(['/lista-establecimientos',{lista: JSON.stringify(this.listaEstablecimientos)}]);
        
      }else{
        console.log("Error consultando establecimientos",resultado);
      }
    });
  }

  Registrarse(){
    // this.navCtrl.navigateRoot('/register');
    this.router.navigate(['/register']);
  }

}
