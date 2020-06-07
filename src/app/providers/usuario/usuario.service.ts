import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RegistrarUsuarioModel } from 'src/app/models/usuario/RegistrarUsuarioModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constantes } from 'src/app/Utils/constantes';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private cabecera = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  registrarUsuario = (oObjeto:RegistrarUsuarioModel):Observable<any> => this.httpClient.post(environment.apiAgendamiento + Constantes.ApiRegistrarUsuario, oObjeto, { headers: this.cabecera });
}
