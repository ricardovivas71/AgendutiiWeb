import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisCitasPage } from './mis-citas.page';
import { Routes, RouterModule } from '@angular/router';
import { CitasService } from 'src/app/providers/citas/citas.service';

const routes: Routes = [
  {
    path: '',
    component: MisCitasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MisCitasPage],
  providers:[CitasService]
})
export class MisCitasPageModule {}
