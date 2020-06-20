import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController, ModalController } from '@ionic/angular';
import { ConsultarServiciosDtoModel } from 'src/app/models/servicios/consultarServiciosDto.mode';
import { GestionarEstablecimientoService } from 'src/app/providers/gestionar-establecimientos/gestionar-establecimiento.service';
import { ServiciosModel } from 'src/app/models/agendar/servicios.model';
import { RegistrarEmpleadosModel } from 'src/app/models/empleados/registrarEmpleados';
import { GestionarEmpleadosService } from 'src/app/providers/gestionarEmpleados/gestionar-empleados.service';

@Component({
  selector: 'app-gestionar-empleados',
  templateUrl: './gestionar-empleados.page.html',
  styleUrls: ['./gestionar-empleados.page.scss'],
})
export class GestionarEmpleadosPage implements OnInit {

  formularioRegistro: FormGroup;
  @ViewChild('fileInput', { static: false }) fileInput;
  public listServicios: ServiciosModel[] = [];
  @Input() idEstablecimiento: string;

  constructor(private formBuilder: FormBuilder,
    public toastController: ToastController,
    private gestionarService:GestionarEstablecimientoService,
    private camera: Camera,
    private empleadosService: GestionarEmpleadosService,
    public modalController: ModalController,) { }

  ngOnInit() {
    this.consultarServicios(this.idEstablecimiento);
    this.formularioRegistro = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.maxLength(50)]],
      apellidos: ['', [Validators.required, Validators.maxLength(50)]],
      imagen: [''],
      lunes: [true],
      martes: [true],
      miercoles: [true],
      jueves: [true],
      viernes: [true],
      sabado: [true],
      domingo: [true],
      servicio: ['',Validators.required]
    });

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

  consultarServicios(idEstablecimiento){
    let oObjeto = new ConsultarServiciosDtoModel();
    oObjeto.idEstablecimiento = idEstablecimiento;

    this.gestionarService.consultarServicios(oObjeto).subscribe(async resultado =>{
      if(resultado.codigo == 1){
        this.listServicios = resultado.respuesta as ServiciosModel[];
      }else{
        const toast = await this.toastController.create({
          message: 'Error consultando los servicios del establecimiento',
          duration: 2000
        });
        toast.present();
      }
    },async error =>{
      const toast = await this.toastController.create({
        message: 'Error consultando los servicios del establecimiento',
        duration: 2000
      });
      toast.present();
    });

  }

  RegistrarEmpleado(){
    console.log("Formulario empleados",this.formularioRegistro.value);

    let oModelRegistrar: RegistrarEmpleadosModel = new RegistrarEmpleadosModel();
    oModelRegistrar.nombres = this.formularioRegistro.get('nombres').value;
    oModelRegistrar.apellidos = this.formularioRegistro.get('apellidos').value;
    oModelRegistrar.lunes = this.formularioRegistro.get('lunes').value;
    oModelRegistrar.martes = this.formularioRegistro.get('martes').value;
    oModelRegistrar.miercoles = this.formularioRegistro.get('miercoles').value;
    oModelRegistrar.jueves = this.formularioRegistro.get('jueves').value;
    oModelRegistrar.viernes = this.formularioRegistro.get('viernes').value;
    oModelRegistrar.sabado = this.formularioRegistro.get('sabado').value;
    oModelRegistrar.domingo = this.formularioRegistro.get('domingo').value;
    oModelRegistrar.idEstablecimiento = parseInt(this.idEstablecimiento);
    oModelRegistrar.imagen = this.formularioRegistro.get('imagen').value;
    let servicios = this.formularioRegistro.get('servicio').value;
    oModelRegistrar.idServicio = "";
    servicios.forEach(element => {
      oModelRegistrar.idServicio += element+",";
    });
    oModelRegistrar.idServicio = oModelRegistrar.idServicio.substring(0,oModelRegistrar.idServicio.length-1);
    console.log("Modelo a guardar",oModelRegistrar);

    this.empleadosService.registrarEmpleados(oModelRegistrar).subscribe(async resultado =>{
      if(resultado.codigo == "1"){
        const toast = await this.toastController.create({
          message: 'Empleado registrado con exito',
          duration: 2000
        });
        toast.present();
        this.modalController.dismiss({
          'dismissed': true
        });
      }else{
        const toast = await this.toastController.create({
          message: 'Ups! ha ocurrido un error registrando el empleado',
          duration: 2000
        });
        toast.present();
      }
    });

  }

}
