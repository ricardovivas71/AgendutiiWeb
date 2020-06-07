import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constantes } from 'src/app/Utils/constantes';
import { ConsultarCitasDtoModel } from 'src/app/models/citas/consultarCitasDto.model';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private cabecera = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  consultarCitasPropias= (oObjeto:ConsultarCitasDtoModel): Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiConsultarCitasPropias, oObjeto, { headers: this.cabecera });
}
