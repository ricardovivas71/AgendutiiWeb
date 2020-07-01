import { Component, OnInit } from '@angular/core';
import { TipoServiciosModel } from 'src/app/models/home/tipoServicios.model';
import { EstablecimientoModel } from 'src/app/models/establecimientos/establecimiento.model';
import { LocalizacionModel } from 'src/app/models/home/localizacion.model';
import { busquedaDTOModel } from 'src/app/models/home/busquedaDTO.model';
import { BuscarEstablecimientoModel } from 'src/app/models/establecimientos/buscarEstablecimientoDTO.model';

import { BarrioModel } from 'src/app/models/home/barrio.model';
import { HomeService } from 'src/app/providers/home/home.service';

import { NavController, MenuController, LoadingController, ToastController, ModalController } from '@ionic/angular';

import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { VariablesGlobalesService } from 'src/app/providers/VariablesGlobales/variables-globales.service';
import { SitioPage } from '../sitio/sitio.page';

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
              private globalesService:VariablesGlobalesService,
              public toastController: ToastController,
              public modalController: ModalController) { }

  ngOnInit() {
    this.ConsultarDatosIniciales(1);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
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
  async obtenerCiudad() {
    console.log("Click obtener ciudad");
    const modal = await this.modalController.create({
      component: SitioPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'tituloPagina': "Buscar ciudades"
      }
    });

    modal.onDidDismiss()
      .then((data:any) => {
        this.ciudadSeleccionada = data.data.ciudadSeleccionada;
    });
    
    return await modal.present();
  }

  /**
  * Autor: Ricardo Vivas
  * Fecha: 24/Mayo/2020
  * Descripción: Dirige a la pantalla de selccionar barrios
  */
  async obtenerBarrio(){
    console.log("Click obtener ciudad");
    const modal = await this.modalController.create({
      component: SitioPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'tituloPagina': "Buscar barrios",
        'idCiudadBarrio': this.ciudadSeleccionada.idLocalizacion
      }
    });

    modal.onDidDismiss()
    .then((data:any) => {
      this.barrioSeleccionado = data.data.barrioSeleccionado;
  });
  
  return await modal.present();
  }

  seleccionarServicio(event){
    console.log("Servicio seleccionado",event.nombre);
    this.globalesService.idServicioSelccionado = event.idCategoriaEst;
    this.servicioSeleccionado = event;
  }

  async BuscarSitios() {
    console.log("Servicio seleccionado",this.servicioSeleccionado);
    if(this.servicioSeleccionado == undefined){
      const toast = await this.toastController.create({
        message: 'Por favor selecciona un servicio',
        duration: 2000
      });
      toast.present();
    }else{

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


  }

  Registrarse(){
    // this.navCtrl.navigateRoot('/register');
    this.router.navigate(['/register']);
  }

}
