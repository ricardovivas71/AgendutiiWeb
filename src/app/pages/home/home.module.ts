import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { Routes, RouterModule } from '@angular/router';
import { HomeService } from 'src/app/providers/home/home.service';
import { VariablesGlobalesService } from 'src/app/providers/VariablesGlobales/variables-globales.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SitioPage } from '../sitio/sitio.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomePage,SitioPage],
  providers:[HomeService,VariablesGlobalesService],
  entryComponents:[SitioPage]
})
export class HomePageModule {}
