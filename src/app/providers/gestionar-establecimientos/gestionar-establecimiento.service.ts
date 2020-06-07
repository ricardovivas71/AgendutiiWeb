import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constantes } from 'src/app/Utils/constantes';
import { busquedaDTOModel } from 'src/app/models/home/busquedaDTO.model';
import { RegistrarEstablecimientoModel } from 'src/app/models/establecimientos/registrarEstablecimientoDTO.model';

@Injectable({
  providedIn: 'root'
})
export class GestionarEstablecimientoService {

  private cabecera = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  consultarLocalizacion = (): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarLocalizacion, { headers: this.cabecera });
  consultarTiposServicios = (oObjeto:busquedaDTOModel) : Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarTiposServicio, { headers: this.cabecera });
  registrarEstablecimiento = (oObjeto:RegistrarEstablecimientoModel): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiRegistrarEstablecimiento, oObjeto,{ headers: this.cabecera });
}
