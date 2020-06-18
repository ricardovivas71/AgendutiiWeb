import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { MisEstablecimientosPage } from './mis-establecimientos.page';
import { GestionarEstablecimientoService } from 'src/app/providers/gestionar-establecimientos/gestionar-establecimiento.service';

const routes: Routes = [
  {
    path: '',
    component: MisEstablecimientosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MisEstablecimientosPage],
  providers:[GestionarEstablecimientoService],
  
})
export class MisEstablecimientosPageModule {}
