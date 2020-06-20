import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GestionarEmpleadosPage } from './gestionar-empleados.page';
import { Routes, RouterModule } from '@angular/router';
import { GestionarEstablecimientoService } from 'src/app/providers/gestionar-establecimientos/gestionar-establecimiento.service';
import { Camera} from '@ionic-native/camera/ngx';
import { GestionarEmpleadosService } from 'src/app/providers/gestionarEmpleados/gestionar-empleados.service';

const routes: Routes = [
  {
    path: '',
    component: GestionarEmpleadosPage
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
  declarations: [GestionarEmpleadosPage],
  providers:[GestionarEstablecimientoService,Camera,GestionarEmpleadosService]
})
export class GestionarEmpleadosPageModule {}
