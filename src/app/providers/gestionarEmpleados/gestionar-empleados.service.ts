import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constantes } from 'src/app/Utils/constantes';
import { ConsultarEmpleadosDtoModel } from 'src/app/models/empleados/consultarEmpleadosDto';
import { RegistrarEmpleadosModel } from 'src/app/models/empleados/registrarEmpleados';

@Injectable({
  providedIn: 'root'
})
export class GestionarEmpleadosService {

  private cabecera = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  consultarEmpleados = (oObjeto:ConsultarEmpleadosDtoModel): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarEmpleadosEstab, oObjeto,{ headers: this.cabecera });
  registrarEmpleados = (oObjeto:RegistrarEmpleadosModel): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiRegistrarEmpleados, oObjeto,{ headers: this.cabecera });
 
}
