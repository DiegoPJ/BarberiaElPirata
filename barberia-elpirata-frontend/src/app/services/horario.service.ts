import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from '../model';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  	  horarios: Horario[];
		
  constructor(private httpClient :HttpClient) { }
  
/*  public añadirUsuario(user:any){
	  return this.httpClient.post(`${baserUrl}/usuarios/`,user);
  }
   
   public comprobarEmail(email:any){
	  return this.httpClient.get(`${baserUrl}/usuarios/${email}`);
  }*/
  public todosLosHorarios(): Observable<Horario[]>{
	  	  return this.httpClient.get<Horario[]>(`${baserUrl}/api/horarios/todosLosHorarios`);
  }
   public añadirHorario(horario: Horario): Observable<Horario> {
	  return this.httpClient.post<Horario>(`${baserUrl}/api/horarios/guardarHorario`, horario);
  }
}
