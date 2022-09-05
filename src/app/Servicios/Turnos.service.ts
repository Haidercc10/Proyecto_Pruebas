import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { modelTurnos } from '../Modulos/modelturnos';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  //Encapsular httpclient en el constructor
  constructor(private http : HttpClient) { }

  //Metodo buscar lista
  srvObtenerLista():Observable<any[]> {
      return this.http.get<any>('/')
  }

  srvObtenerListaPorId(dato : any){
    return this.http.get<any>(`//${dato}`);
  }

  //Metodo actualzar
  srvActualizar(id:number|String, data:any) {
    return this.http.put(`//${id}`, data);
  }

  //Metodo eliminar
  srvEliminar(id:number|String) {
    return this.http.delete(`//${id}`);
  }

  //Duardar
  srvGuardar(data : modelTurnos): Observable<any> {
    return this.http.post('/', data);
  }


}
