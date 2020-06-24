import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GestionarEstablecimientoService } from 'src/app/providers/gestionar-establecimientos/gestionar-establecimiento.service';
import { LocalizacionModel } from 'src/app/models/home/localizacion.model';
import { busquedaDTOModel } from 'src/app/models/home/busquedaDTO.model';
import { TipoServiciosModel } from 'src/app/models/home/tipoServicios.model';
import { RegistrarEstablecimientoModel } from 'src/app/models/establecimientos/registrarEstablecimientoDTO.model';
import { ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { HorasDisponiblesModel } from 'src/app/models/agendar/horasDisponibles.model';
import { DatePipe } from '@angular/common';
import { Constantes } from 'src/app/Utils/constantes';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-gestionar-establecimientos',
  templateUrl: './gestionar-establecimientos.page.html',
  styleUrls: ['./gestionar-establecimientos.page.scss'],
})
export class GestionarEstablecimientosPage implements OnInit {

  formularioRegistro: FormGroup;
  listaCiudades: LocalizacionModel[] = [];
  listaTipoEstablecimiento: TipoServiciosModel[] = [];
  public listaHorasDisponibles: HorasDisponiblesModel[] = [];
  public treintaMinutos: number = 1800000;
  @ViewChild('fileInput', { static: false }) fileInput;
  idUsuario:number;

  constructor(private formBuilder: FormBuilder,
    private gestionarEstService: GestionarEstablecimientoService,
    public toastController: ToastController,
    private camera: Camera,
    private router: Router,
    private storage: Storage,
    @Inject(LOCALE_ID) private locale: string) { }


  ngOnInit() {
    this.storage.get('idUsuario').then((val) => {
      console.log("ID USUARIO",val);
      this.idUsuario = val;
    });
    this.crearRangoHorario();
    this.obtenerCiudades();
    this.obtenerTipoEstablecimientos();
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      ciudad: ['', [Validators.required, Validators.maxLength(50)]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      barrio: ['', [Validators.required, Validators.maxLength(50)]],
      tipoEstablecimiento: ['', [Validators.required, Validators.maxLength(50)]],
      capacidad: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(50)]],
      imagen: [''],
      horaInicio :['',[Validators.required]],
      horaFin :['',[Validators.required]],
    });

  }

  crearRangoHorario(){
    let contador: number = 1;
    let horaInicio = new Date();
    horaInicio.setHours(5);
    horaInicio.setMinutes(0);
    horaInicio.setSeconds(0);
    let horaFin = new Date();
    horaFin.setHours(22);
    horaFin.setMinutes(0);
    horaFin.setSeconds(0);

    while (horaFin.getTime() >= horaInicio.getTime()) {
      let pivote = horaInicio.getTime() + this.treintaMinutos;
      let siguienteHora = new Date(pivote);
      this.listaHorasDisponibles.push(new HorasDisponiblesModel(contador, siguienteHora));
      horaInicio = new Date(siguienteHora);
      contador++;
    }
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.formularioRegistro.patchValue({ 'imagen': data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.formularioRegistro.patchValue({ 'imagen': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.formularioRegistro.controls['imagen'].value + ')'
  }

  obtenerCiudades() {
    this.gestionarEstService.consultarLocalizacion().subscribe(resultado => {
      console.log("RESULTADO CIUDADES", resultado);
      if (resultado.codigo == 1) {
        this.listaCiudades = resultado.respuesta as LocalizacionModel[];
      } else {
        console.log("ERROR LISTA CIU", resultado);
      }
    });
  }

  obtenerTipoEstablecimientos() {
    let oBusqueda = new busquedaDTOModel(1);
    this.gestionarEstService.consultarTiposServicios(oBusqueda).subscribe(resultado => {
      console.log("RESULTADO INICIAL", resultado);
      if (resultado.codigo == 1) {
        this.listaTipoEstablecimiento = resultado.respuesta as TipoServiciosModel[];
      } else {
        console.log("ERROR DATOS INICIALES", resultado);
      }
    });
  }

  RegistrarEstablecimiento() {
    console.log("Registro model", this.formularioRegistro.value);
    let oModelRegistrar: RegistrarEstablecimientoModel = new RegistrarEstablecimientoModel(
      this.formularioRegistro.get('nombre').value,
      this.formularioRegistro.get('direccion').value,
      this.formularioRegistro.get('ciudad').value,
      this.formularioRegistro.get('tipoEstablecimiento').value,
      this.formularioRegistro.get('barrio').value,
      this.formularioRegistro.get('descripcion').value,
      this.idUsuario,
      5,
      parseInt(this.formularioRegistro.get('capacidad').value),
      this.formularioRegistro.get('imagen').value,
      new DatePipe(this.locale).transform(new Date(this.formularioRegistro.get('horaInicio').value), Constantes.formatoFechaLargo, this.locale),
      new DatePipe(this.locale).transform(new Date(this.formularioRegistro.get('horaFin').value), Constantes.formatoFechaLargo, this.locale)
    );
    console.log(oModelRegistrar,"MODELO REGISTRAR");
    this.router.navigate(['/mis-establecimientos']);
    this.gestionarEstService.registrarEstablecimiento(oModelRegistrar).subscribe(async resultado =>{
      if(resultado.codigo == 1){
        const toast = await this.toastController.create({
          message: 'Establecimiento registrado con exito',
          duration: 2000
        });
        toast.present();
        console.log("ID ESTABLECIMIENTO..",resultado.respuesta)
        this.router.navigate(['/mis-establecimientos',{idEstablecimiento: resultado.respuesta}]);
      }else{
        const toast = await this.toastController.create({
          message: 'Error registrando el establecimiento',
          duration: 2000
        });
        toast.present();
      }
    });
  }

}
