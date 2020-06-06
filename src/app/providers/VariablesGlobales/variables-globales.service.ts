import { Injectable } from '@angular/core';
import { EstablecimientoModel } from 'src/app/models/establecimientos/establecimiento.model';
import { LocalizacionModel } from 'src/app/models/home/localizacion.model';
import { TipoServiciosModel } from 'src/app/models/home/tipoServicios.model';
import { BarrioModel } from 'src/app/models/home/barrio.model';

@Injectable({
  providedIn: 'root'
})
export class VariablesGlobalesService {

  public ciudadSeleccionada: LocalizacionModel;
  public barrioSeleccionado: BarrioModel;
  public servicioSeleccionado: TipoServiciosModel;
  public idServicioSelccionado: number = 0;

  constructor() { }
}
