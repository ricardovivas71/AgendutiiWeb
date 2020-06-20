import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MisEmpleadosPage } from './mis-empleados.page';
import { Routes, RouterModule } from '@angular/router';
import { GestionarEmpleadosService } from 'src/app/providers/gestionarEmpleados/gestionar-empleados.service';
import { GestionarEmpleadosPage } from '../gestionar-empleados/gestionar-empleados.page';
import { Camera} from '@ionic-native/camera/ngx';

const routes: Routes = [
  {
    path: '',
    component: MisEmpleadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MisEmpleadosPage,GestionarEmpleadosPage],
  providers:[GestionarEmpleadosService,Camera],
  entryComponents:[GestionarEmpleadosPage]
})
export class MisEmpleadosPageModule {}
