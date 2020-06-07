import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConsultarServiciosModel } from 'src/app/models/agendar/consultarServicios.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constantes } from 'src/app/Utils/constantes';
import { ConsultarEmpleadosModel } from 'src/app/models/agendar/consultarEmpleados.model';
import { horarioEstablecimientoDtoModel } from 'src/app/models/agendar/horarioEstablecimientoDto.model';
import { HorarioEmpleadoDtoModel } from 'src/app/models/agendar/horarioEmpleadoDto.model';
import { AgendarCitaModel } from 'src/app/models/agendar/agendarCita.model';

@Injectable({
  providedIn: 'root'
})
export class AgendarService {

  private cabecera = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  consultarLocalizacion = (oObjeto:ConsultarServiciosModel): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarServicios, oObjeto, { headers: this.cabecera });
  consultarEmpleados = (oObjeto:ConsultarEmpleadosModel):Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarEmpleados, oObjeto, { headers: this.cabecera });
  consultarHorarioEstablecimiento = (oObjeto: horarioEstablecimientoDtoModel): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarHorarioEstablecimiento, oObjeto, { headers: this.cabecera });
  consultarHorarioEmpleado = (oObjeto:HorarioEmpleadoDtoModel):Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarDispColaborador, oObjeto, { headers: this.cabecera });
  agendarCita = (oObjeto:AgendarCitaModel):Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiAgendarCita, oObjeto, { headers: this.cabecera });
}
