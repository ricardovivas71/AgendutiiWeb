import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { busquedaDTOModel } from 'src/app/models/home/busquedaDTO.model';
import { BuscarEstablecimientoModel } from 'src/app/models/establecimientos/buscarEstablecimientoDTO.model';

import { environment } from 'src/environments/environment';
import { Constantes } from 'src/app/Utils/constantes';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private cabecera = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
  }

  consultarLocalizacion = (): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarLocalizacion, { headers: this.cabecera });
  consultarBarrios = (oObjeto:busquedaDTOModel): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarBarrios, oObjeto, { headers: this.cabecera });
  consultarEstablecimientos = (oObjeto: BuscarEstablecimientoModel): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarEstablecimientos, oObjeto, { headers: this.cabecera });
  consultarTiposServicios = (oObjeto:busquedaDTOModel) : Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarTiposServicio, { headers: this.cabecera });
  
}
