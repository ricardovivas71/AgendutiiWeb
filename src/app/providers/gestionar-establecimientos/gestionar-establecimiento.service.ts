import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constantes } from 'src/app/Utils/constantes';
import { busquedaDTOModel } from 'src/app/models/home/busquedaDTO.model';
import { RegistrarEstablecimientoModel } from 'src/app/models/establecimientos/registrarEstablecimientoDTO.model';
import { MisEstablecimientoModelDto } from 'src/app/models/establecimientos/MisEstablecimientosDTO.model';
import { ConsultarServiciosDtoModel } from 'src/app/models/servicios/consultarServiciosDto.mode';

@Injectable({
  providedIn: 'root'
})
export class GestionarEstablecimientoService {

  private cabecera = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  consultarLocalizacion = (): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarCiudades, { headers: this.cabecera });
  consultarTiposServicios = (oObjeto:busquedaDTOModel) : Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarTiposServicio, { headers: this.cabecera });
  registrarEstablecimiento = (oObjeto:RegistrarEstablecimientoModel): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiRegistrarEstablecimiento, oObjeto,{ headers: this.cabecera });
  consultarMisEstablecimientos = (oObjeto: MisEstablecimientoModelDto) : Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarMisEstablecimiento, oObjeto, {headers: this.cabecera});
  consultarServicios = (oObjeto: ConsultarServiciosDtoModel): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarServiciosEstablecimiento, oObjeto, {headers: this.cabecera});
}
