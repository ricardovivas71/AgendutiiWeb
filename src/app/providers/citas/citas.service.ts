import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constantes } from 'src/app/Utils/constantes';
import { ConsultarCitasDtoModel } from 'src/app/models/citas/consultarCitasDto.model';
import { CitasEstablecimientoDtoModel } from 'src/app/models/citas/citasEstablecimientoDto.model';
import { ActualizarEstadoCitaModel } from 'src/app/models/citas/actualizarEstado.model';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private cabecera = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  consultarCitasPropias= (oObjeto:ConsultarCitasDtoModel): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarCitasPropias, oObjeto, { headers: this.cabecera });
  consultarCitasEstablecimiento = (oObjeto:CitasEstablecimientoDtoModel): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarCitaEstablecimiento, oObjeto, { headers: this.cabecera });
  gestionarCitas = (oObjeto:ActualizarEstadoCitaModel): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiGestionarCitas, oObjeto, { headers: this.cabecera });
}
