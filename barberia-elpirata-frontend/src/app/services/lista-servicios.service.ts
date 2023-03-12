import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio, Corte, Estilo } from '../model';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ListaServiciosService {
  constructor(private httpClient :HttpClient) { }


public todaLaListaDeServicios(): Observable<Servicio[]>{
	  	  return this.httpClient.get<Servicio[]>(`${baserUrl}/api/servicios/todosLosServicios`);
  }

public todaLaListaDeServiciosCorte(): Observable<Corte[]>{
	  	  return this.httpClient.get<Corte[]>(`${baserUrl}/api/cortes/todosLosCortes`);
  }
public todaLaListaDeServiciosEstilo(): Observable<Estilo[]>{
	  	  return this.httpClient.get<Estilo[]>(`${baserUrl}/api/estilos/todosLosEstilos`);
  }

}