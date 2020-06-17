import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TiempoAtencionModel } from 'src/app/models/servicios/tiempoAtencion.model';

@Component({
  selector: 'app-registrar-servicio',
  templateUrl: './registrar-servicio.page.html',
  styleUrls: ['./registrar-servicio.page.scss'],
})
export class RegistrarServicioPage implements OnInit {

  formularioRegistro: FormGroup;
  listaTiempo: TiempoAtencionModel[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.llenarTiempoAtencion();
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      precio: ['', [Validators.required, Validators.maxLength(50)]],
      tiempo: ['', [Validators.required]]
    });
  }

  llenarTiempoAtencion(){
    this.listaTiempo.push(new TiempoAtencionModel("15 minutos",15));
    this.listaTiempo.push(new TiempoAtencionModel("30 minutos",30));
    this.listaTiempo.push(new TiempoAtencionModel("45 minutos",45));
    this.listaTiempo.push(new TiempoAtencionModel("1 hora",60));
    this.listaTiempo.push(new TiempoAtencionModel("1 hora 15 minutos",75));
    this.listaTiempo.push(new TiempoAtencionModel("1 hora 30 minutos",90));
    this.listaTiempo.push(new TiempoAtencionModel("1 hora 45 minutos",105));
    this.listaTiempo.push(new TiempoAtencionModel("2 horas",120));
    this.listaTiempo.push(new TiempoAtencionModel("2 horas 15 minutos",135));
    this.listaTiempo.push(new TiempoAtencionModel("2 horas 30 minutos",150));
    this.listaTiempo.push(new TiempoAtencionModel("2 horas 45 minutos",175));
    this.listaTiempo.push(new TiempoAtencionModel("3 horas",190));

  }

  RegistrarServicio(){
    console.log("Model servicio",this.formularioRegistro.value);
  }

}
