import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { modelRegistroAsistencia } from '../Modulos/modelRegistroAsistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaUsuarioService {

  //Encapsular httpclient en el constructor
  constructor(private http : HttpClient) { }

  //Metodo buscar lista
  srvObtenerLista():Observable<any[]> {
      return this.http.get<any>('/')
  }

  srvObtenerListaPorId(dato : any){
    return this.http.get<any>(`//${dato}`);
  }

  srvObtenerListaPorUsuario(dato : any, fecha : any){
    return this.http.get<any>(`//${dato}/${fecha}`);
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
  srvGuardar(data : modelRegistroAsistencia): Observable<any> {
    return this.http.post('/', data);
  }

}
