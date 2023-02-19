import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '../model';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  citas: Cita[];

  constructor(private httpClient :HttpClient) { }
  
/*  public añadirUsuario(user:any){
	  return this.httpClient.post(`${baserUrl}/usuarios/`,user);
  }
   
   public comprobarEmail(email:any){
	  return this.httpClient.get(`${baserUrl}/usuarios/${email}`);
  }*/
  public todosLasCitas(): Observable<Cita[]>{
	  	  return this.httpClient.get<Cita[]>(`${baserUrl}/api/citas`);
  }
  public getCitasByUsuario(id_usuario: number): Observable<Cita[]> {
  return this.httpClient.get<Cita[]>(`${baserUrl}/api/citas/${id_usuario}`);
	}
}
