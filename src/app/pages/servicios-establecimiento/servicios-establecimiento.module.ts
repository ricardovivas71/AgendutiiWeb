import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ServiciosEstablecimientoPage } from './servicios-establecimiento.page';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarServicioPage } from '../registrar-servicio/registrar-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: ServiciosEstablecimientoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServiciosEstablecimientoPage,RegistrarServicioPage],
  entryComponents:[RegistrarServicioPage]
})
export class ServiciosEstablecimientoPageModule {}
