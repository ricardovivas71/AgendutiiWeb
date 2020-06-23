import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CitasEstablecimientoPage } from './citas-establecimiento.page';
import { Routes, RouterModule } from '@angular/router';
import { CitasService } from 'src/app/providers/citas/citas.service';


const routes: Routes = [
  {
    path: '',
    component: CitasEstablecimientoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CitasEstablecimientoPage],
  providers:[CitasService]
})
export class CitasEstablecimientoPageModule {}
