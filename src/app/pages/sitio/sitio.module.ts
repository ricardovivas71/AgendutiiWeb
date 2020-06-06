import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { SitioPage } from './sitio.page';
import { HomeService } from 'src/app/providers/home/home.service';
import { VariablesGlobalesService } from 'src/app/providers/VariablesGlobales/variables-globales.service';

const routes: Routes = [
  {
    path: '',
    component: SitioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SitioPage],
  providers:[HomeService,VariablesGlobalesService]
})
export class SitioPageModule {}
