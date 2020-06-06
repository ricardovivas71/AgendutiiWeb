import { Component, OnInit } from '@angular/core';

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
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private globalesService:VariablesGlobalesService) { }

  ngOnInit() {

    this.ciudadSeleccionada = JSON.parse(this.activatedRoute.snapshot.paramMap.get('ciudadSeleccionada'));
    this.barrioSeleccionado = JSON.parse(this.activatedRoute.snapshot.paramMap.get('barrioSeleccionado'));
    this.ConsultarDatosIniciales(1);
    this.funcionHabilitarBusqueda();
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

  /**
  * Autor: Ricardo Vivas
  * Fecha: 24/Mayo/2020
  * Descripción: Dirige a la pantalla de selecionar Ciudades
  */
  obtenerCiudad() {
    this.router.navigate(['/sitio',{titulo: 'Buscar ciudades'}]);
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
    this.router.navigate(['/registrar-usuario']);
  }

}
