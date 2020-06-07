import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GestionarEstablecimientosPage } from './gestionar-establecimientos.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GestionarEstablecimientosPage
}
];

@NgModule({
imports: [
CommonModule,
FormsModule,
ReactiveFormsModule,
IonicModule,
RouterModule.forChild(routes),
  ],
  declarations: [GestionarEstablecimientosPage]
})
export class GestionarEstablecimientosPageModule {}
