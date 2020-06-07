import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { ListaEstablecimientosPage } from './lista-establecimientos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEstablecimientosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ListaEstablecimientosPage]
})
export class ListaEstablecimientosPageModule {}
