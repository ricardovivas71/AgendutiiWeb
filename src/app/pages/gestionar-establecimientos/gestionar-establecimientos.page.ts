import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GestionarEstablecimientoService } from 'src/app/providers/gestionar-establecimientos/gestionar-establecimiento.service';
import { LocalizacionModel } from 'src/app/models/home/localizacion.model';
import { busquedaDTOModel } from 'src/app/models/home/busquedaDTO.model';
import { TipoServiciosModel } from 'src/app/models/home/tipoServicios.model';
import { RegistrarEstablecimientoModel } from 'src/app/models/establecimientos/registrarEstablecimientoDTO.model';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-gestionar-establecimientos',
  templateUrl: './gestionar-establecimientos.page.html',
  styleUrls: ['./gestionar-establecimientos.page.scss'],
})
export class GestionarEstablecimientosPage implements OnInit {

  formularioRegistro: FormGroup;
  listaCiudades: LocalizacionModel[] = [];
  listaTipoEstablecimiento: TipoServiciosModel[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private gestionarEstService: GestionarEstablecimientoService,
              public toastController: ToastController,) { }

  ngOnInit() {

    this.obtenerCiudades();
    this.obtenerTipoEstablecimientos();
    this.formularioRegistro = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.maxLength(50)]],
      ciudad: ['',[Validators.required, Validators.maxLength(50)]],
      direccion: ['',[Validators.required, Validators.maxLength(50)]],
      barrio: ['',[Validators.required, Validators.maxLength(50)]],
      tipoEstablecimiento: ['',[Validators.required, Validators.maxLength(50)]],
      capacidad: ['',[Validators.required, Validators.maxLength(50)]],
      descripcion: ['',[Validators.required, Validators.maxLength(50)]],
      imagen: ['',[Validators.required]]
    });

  }

  obtenerCiudades(){
    this.gestionarEstService.consultarLocalizacion().subscribe(resultado => {
      console.log("RESULTADO CIUDADES",resultado);
      if (resultado.codigo == 1) {
        this.listaCiudades = resultado.respuesta as LocalizacionModel[];
      } else {
        console.log("ERROR LISTA CIU", resultado);
      }
    });    
  }

  obtenerTipoEstablecimientos(){
    let oBusqueda = new busquedaDTOModel(1);
    this.gestionarEstService.consultarTiposServicios(oBusqueda).subscribe(resultado =>{
      console.log("RESULTADO INICIAL",resultado);
      if(resultado.codigo == 1){
        this.listaTipoEstablecimiento = resultado.respuesta as TipoServiciosModel[];
      }else{
        console.log("ERROR DATOS INICIALES", resultado);
      }
    });
  }

  RegistrarEstablecimiento(){
    console.log("Registro model",this.formularioRegistro.value);
    let oModelRegistrar: RegistrarEstablecimientoModel = new RegistrarEstablecimientoModel(
      this.formularioRegistro.get('nombre').value,
      this.formularioRegistro.get('direccion').value,
      this.formularioRegistro.get('ciudad').value,
      this.formularioRegistro.get('tipoEstablecimiento').value,
      this.formularioRegistro.get('barrio').value,
      this.formularioRegistro.get('descripcion').value,
      1,
      5,
      parseInt(this.formularioRegistro.get('capacidad').value),
      ""
    );
    console.log(oModelRegistrar,"MODELO REGISTRAR");
    // this.router.navigate(['/mis-establecimientos']);
    this.gestionarEstService.registrarEstablecimiento(oModelRegistrar).subscribe(async resultado =>{
      if(resultado.codigo == 1){
        const toast = await this.toastController.create({
          message: 'Establecimiento registrado con exito',
          duration: 2000
        });
        toast.present();
        console.log("ID ESTABLECIMIENTO..",resultado.respuesta)
        this.router.navigate(['/mis-establecimientos']);
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
