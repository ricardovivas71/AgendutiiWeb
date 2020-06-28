import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { IonSlides, ToastController, Platform, ModalController } from '@ionic/angular';
import { ServiciosModel } from 'src/app/models/agendar/servicios.model';
import { EmpleadosModel } from 'src/app/models/agendar/empleados.model';
import { ConsultarServiciosModel } from 'src/app/models/agendar/consultarServicios.model';
import { AgendarService } from 'src/app/providers/agendar/agendar.service';
import { DatePipe } from '@angular/common';
import { ConsultarEmpleadosModel } from 'src/app/models/agendar/consultarEmpleados.model';
import { Constantes } from 'src/app/Utils/constantes';
import { HorarioEstablecimientoModel } from 'src/app/models/agendar/horarioEstablecimiento.model';
import { HorarioEmpleadoModel } from 'src/app/models/agendar/horarioEmpleado.model';
import { HorasDisponiblesModel } from 'src/app/models/agendar/horasDisponibles.model';
import { horarioEstablecimientoDtoModel } from 'src/app/models/agendar/horarioEstablecimientoDto.model';
import { HorarioEmpleadoDtoModel } from 'src/app/models/agendar/horarioEmpleadoDto.model';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';
import { ConfirmacionPage } from './confirmacion/confirmacion.page';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CitasEmpleadoModel } from 'src/app/models/citas/citasEmpleado';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.page.html',
  styleUrls: ['./agendar-cita.page.scss'],
})
export class AgendarCitaPage implements OnInit {

  steps: any[] = ["Fecha Cita", "Servicio", "Colaborador", "Hora"];
  @ViewChild('theslides', { static: true }) slides: IonSlides;
  numberss: any;
  numbers: any;
  activeIndex: number = 0;
  buttonText: any = "Siguiente";

  public listaServicios: ServiciosModel[] = [];
  public listaEmpleados: EmpleadosModel[] = [];
  colaboradorSeleccionado: EmpleadosModel;
  servicioSeleccionado: ServiciosModel;
  fechaSeleccionada: Date;
  fechaActual: Date = new Date();
  public listaHorarioEstablecimiento: HorarioEstablecimientoModel[] = [];
  public listaCitasEmpleado: HorarioEmpleadoModel[] = [];
  public listaHorasDisponibles: HorasDisponiblesModel[] = [];
  public quinceMinutos: number = 900000;
  public listaHorasDispAux: HorasDisponiblesModel[] = [];
  public idEstablecimiento: number;
  public nombreEstablecimiento: string;
  horaSeleccionada: Date;

  constructor(private agendarService: AgendarService,
    @Inject(LOCALE_ID) private locale: string,
    public toastController: ToastController,
    private platform: Platform,
    public admobFree: AdMobFree,
    private modalCtrl:ModalController,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.idEstablecimiento = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.nombreEstablecimiento = this.activatedRoute.snapshot.paramMap.get('nombre');
    console.log("ID ESTABLECIMIENTO",this.idEstablecimiento);
    this.inicializarStep();
    this.ConsultarServicios(this.idEstablecimiento);
  }

  inicializarStep() {
    this.slides.length()
      .then(num => {
        this.numbers = num;
        this.numberss = Array(this.numbers).fill(0).map((x, i) => i);
        console.log(this.numberss);
      });
  }

  checkIsend() {
    this.slides.isEnd()
      .then(result => {
        console.log(result);
        this.switchFunctions(result);
      })
  }

  async switchFunctions(result) {
    if (result) {
      if (this.platform.is("cordova")) {
        this.showInterstitialAds();
      }
      if(this.horaSeleccionada != undefined){
        this.showSuccessModal();
      }else{
        const toast = await this.toastController.create({
          message: 'Por favor selecciona la hora de tu cita!',
          duration: 2000
        });
        toast.present();
      }
    }

    else {
      this.slides.slideNext();
    }

  }

  showInterstitialAds() {
    let interstitialConfig: AdMobFreeInterstitialConfig = {
      isTesting: false, // Remove in production
      autoShow: true,
      id: "" // your ad id here
    };
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.interstitial.prepare().then(() => {
    }).catch(e => alert(e));
  }

  async showSuccessModal()
  {
    const fechaInicioCita = new Date(this.fechaSeleccionada != undefined ? this.fechaSeleccionada : this.fechaActual);
    const modal = await this.modalCtrl.create({
      component: ConfirmacionPage,
      backdropDismiss: true,
      componentProps: {
        'fechaInicioCita': fechaInicioCita,
        'colaboradorSeleccionado':this.colaboradorSeleccionado,
        'servicioSeleccionado':this.servicioSeleccionado,
        'horaSeleccionada':this.horaSeleccionada
      }
    });

    return await modal.present();
  }

  onSlideChange() {
    this.slides.getActiveIndex()
      .then(index => {
        this.activeIndex = index;
        if (index == 3) {
          this.buttonText = 'Agendar';
        }
        else {
          this.buttonText = 'Siguiente'
        }
      });
  }

  onSlideNextStart(){
    console.log("SIGUIENTE DIAPOSITIVA");
    this.slides.getActiveIndex()
    .then(async index => {
      this.activeIndex = index;
      console.log(this.activeIndex);

      switch (this.activeIndex) {
        case 1:
          if(this.fechaSeleccionada == undefined){
            this.slides.slidePrev();
            const toast = await this.toastController.create({
              message: 'Por favor selecciona el día de tu cita!',
              duration: 2000
            });
            toast.present();
          }
          break;
        case 2:
          if(this.servicioSeleccionado == undefined){
            this.slides.slidePrev();
            const toast = await this.toastController.create({
              message: 'Por favor selecciona un servicio!',
              duration: 2000
            });
            toast.present();
          }
          break;
        case 3:
          if(this.colaboradorSeleccionado == undefined){
            this.slides.slidePrev();
            const toast = await this.toastController.create({
              message: 'Por favor selecciona un colaborador!',
              duration: 2000
            });
            toast.present();
          }
          break;
        default:
          break;
      }

    });
  }

  obtenerHora(event){
    //console.log("Hora seleccionada",event);
    this.horaSeleccionada = new Date(event.hora);
    console.log("Hora seleccionada",this.horaSeleccionada);
  }


  ModalColaborador(empleado) {
    console.log("Colaborador seleccionado",empleado);
    this.colaboradorSeleccionado = empleado;
    this.ObtenerHorasDisponibles();
  }

  SeleccionarFecha(event) {
    console.log("Fecha seleccionada", event._d);
    this.fechaSeleccionada = new Date(event._d);
    console.log("Fecha Cita", this.fechaSeleccionada);
    this.servicioSeleccionado = undefined;
    this.colaboradorSeleccionado = null;
    this.ConsultarServicios(this.idEstablecimiento);
    this.ObtenerHorarioMinMaximo();
  }

  ConsultarServicios(idEstablecimiento) {
    this.listaServicios = [];
    this.listaEmpleados = [];
    let oBusqueda = new ConsultarServiciosModel(idEstablecimiento);
    console.log("MODELO SERVICIOS", oBusqueda);
    this.agendarService.consultarLocalizacion(oBusqueda).subscribe(resultado => {
      console.log("RESULTADO SERVICIOS", resultado);
      if (resultado.codigo == 1) {
        this.listaServicios = resultado.respuesta as ServiciosModel[];
      } else {
        console.log("RESULTADO SERVICIOS", resultado);
      }
    });
  }

  obtenerEmpleado(servicio) {
    this.colaboradorSeleccionado = undefined;
    this.servicioSeleccionado = servicio;
    console.log("Servicio ngModel", event);
    this.listaEmpleados = [];
    let fechaFinal = new DatePipe(this.locale).transform(this.fechaSeleccionada != undefined ? this.fechaSeleccionada : this.fechaActual, Constantes.formatoFechaLargo, this.locale);
    let oConsultarEmpleados = new ConsultarEmpleadosModel(this.idEstablecimiento, servicio.idServicio, fechaFinal);
    console.log("MODEL consultar empleados", oConsultarEmpleados);
    this.agendarService.consultarEmpleados(oConsultarEmpleados).subscribe(async resultado => {
      console.log("Resutlado consultar empleados", resultado);
      if (resultado.codigo == 1) {
        if (resultado.respuesta != null && resultado.respuesta.length > 0) {
          resultado.respuesta.forEach(element => {
            this.listaEmpleados.push(new EmpleadosModel(
              element.idEmpleado,
              element.nombre,
              element.lunes,
              element.martes,
              element.miercoles,
              element.jueves,
              element.viernes,
              element.sabado,
              element.domingo,
              element.imagen != "" ? this.sanitizer.bypassSecurityTrustResourceUrl(element.imagen) : ""));
          });
        } else {
          console.log("Entra al else");
          const toast = await this.toastController.create({
            message: 'No existen colaboradores disponibles para la fecha y servicios seleccionados',
            duration: 2000
          });
          toast.present();
        }
      } else {
        console.log("ERROR Consultando empleados", resultado)
      }
    });

  }

  ObtenerHorarioMinMaximo() {
    this.listaHorarioEstablecimiento = [];
    let horarioEstablecimientoDto = new horarioEstablecimientoDtoModel(this.idEstablecimiento, new DatePipe(this.locale).transform(this.fechaSeleccionada != undefined ? this.fechaSeleccionada : this.fechaActual, Constantes.formatoFechaLargo, this.locale));
    this.agendarService.consultarHorarioEstablecimiento(horarioEstablecimientoDto).subscribe(resultado => {
      console.log("Resultado Horario Establecimiento", resultado);
      if (resultado.codigo == 1) {
        this.listaHorarioEstablecimiento = resultado.respuesta as HorarioEstablecimientoModel[];
        this.GenerarHorarioEstablecimiento(this.listaHorarioEstablecimiento);
      }
    });
  }

  ObtenerHorasDisponibles() {
    this.listaCitasEmpleado = [];
    let horarioEmpleadoDto = new HorarioEmpleadoDtoModel(this.colaboradorSeleccionado.idEmpleado, new DatePipe(this.locale).transform(this.fechaSeleccionada != undefined ? this.fechaSeleccionada : this.fechaActual, Constantes.formatoFechaLargo, this.locale));
    this.agendarService.consultarHorarioEmpleado(horarioEmpleadoDto).subscribe(resultado => {
      console.log("Resultado Horario Nigga", resultado);
      if (resultado.codigo == 1) {
        this.listaCitasEmpleado = resultado.respuesta as HorarioEmpleadoModel[];
        this.GenerarHorasEmpleado(this.listaCitasEmpleado);
      }
      //this.GenerarHorarioDisponible();
      
    });
  }

  GenerarHorasEmpleado(listaCitasEmpleado: HorarioEmpleadoModel[]){
    let listaHorasOcupaEmpleado: HorasDisponiblesModel[] = [];
    let contador = 1;
    for(let i=0;i<listaCitasEmpleado.length;i++){
      let horaInicio = new Date(listaCitasEmpleado[i].fechaInicio);
      let horaFin = new Date(listaCitasEmpleado[i].fechaFin);

      while(horaInicio.getTime() < horaFin.getTime()){
        listaHorasOcupaEmpleado.push(new HorasDisponiblesModel(contador,horaInicio,true));
        let pivote = horaInicio.getTime() + this.quinceMinutos;
        let siguienteHora = new Date(pivote);
        horaInicio = new Date(siguienteHora);
        contador++;
      }
    }
    console.log("Horas ocupadas empleado",listaHorasOcupaEmpleado);
    this.HorasDisponiblesCita(listaHorasOcupaEmpleado);
  }

  async HorasDisponiblesCita(listaHorasOcupaEmpleado:HorasDisponiblesModel[]){
    this.listaHorasDisponibles.forEach(element =>{
      element.hora.setFullYear(listaHorasOcupaEmpleado[0].hora.getFullYear());
      element.hora.setMonth(listaHorasOcupaEmpleado[0].hora.getMonth());
      element.hora.setDate(listaHorasOcupaEmpleado[0].hora.getDate());
    });

    this.listaHorasDisponibles.forEach((element,index) =>{
      let encontrar = listaHorasOcupaEmpleado.find(horaEmp => horaEmp.hora.getTime() == element.hora.getTime());
      console.log("ENCONTRAR",encontrar);
      if(encontrar){
        this.listaHorasDisponibles[index].disponible = false;
      }
    });
    this.listaHorasDisponibles = this.listaHorasDisponibles.filter(x => x.disponible);
    if(this.listaHorasDisponibles.length == 0){
      const toast = await this.toastController.create({
        message: 'No existen horarios disponibles para el día y servicio seleccionados, por favor intente con otro colaborador',
        duration: 2000
      });
      toast.present();
    }
    console.log("HORAS DISPONIBLES CITA",this.listaHorasDisponibles);
  }

  GenerarHorarioEstablecimiento(listaHorarioEstablecimiento: HorarioEstablecimientoModel[]) {
    this.listaHorasDisponibles = [];
    let contador: number = 2;
    let horaInicioSitio = new Date();
    horaInicioSitio.setHours(new Date(listaHorarioEstablecimiento[0].horaInicio).getHours());
    horaInicioSitio.setMinutes(new Date(listaHorarioEstablecimiento[0].horaInicio).getMinutes());
    horaInicioSitio.setSeconds(0);
    horaInicioSitio.setMilliseconds(0);
    let horaFinSitio = new Date();
    horaFinSitio.setHours(new Date(listaHorarioEstablecimiento[0].horaFin).getHours());
    horaFinSitio.setMinutes(new Date(listaHorarioEstablecimiento[0].horaFin).getMinutes());
    horaFinSitio.setSeconds(0);
    horaFinSitio.setMilliseconds(0);

    this.listaHorasDisponibles.push(new HorasDisponiblesModel(1, horaInicioSitio,true));

    while (horaFinSitio.getTime() > horaInicioSitio.getTime()) {
      let pivote = horaInicioSitio.getTime() + this.quinceMinutos;
      let siguienteHora = new Date(pivote);
      this.listaHorasDisponibles.push(new HorasDisponiblesModel(contador, siguienteHora,true));
      horaInicioSitio = new Date(siguienteHora);
      contador++;
    }
    console.log("Horario Establecimiento",this.listaHorasDisponibles);
  }
}
