import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendarCitaPage } from './agendar-cita.page';
import { Routes, RouterModule } from '@angular/router';
import { CalendarModule } from 'ion2-calendar';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { ConfirmacionPage } from './confirmacion/confirmacion.page';


const routes: Routes = [
  {
    path: '',
    component: AgendarCitaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AgendarCitaPage,ConfirmacionPage],
  providers:[AdMobFree],
  entryComponents:[ConfirmacionPage]
})
export class AgendarCitaPageModule {}
