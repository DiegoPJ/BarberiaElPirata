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
 public eliminarServicio(servicioId: number): Observable<void> {
	  return this.httpClient.delete<void>(`${baserUrl}/api/servicios/eliminarServicio/${servicioId}`);
  }
  
  public añadirServicio(servicio: Servicio): Observable<Servicio> {
	  return this.httpClient.post<Servicio>(`${baserUrl}/api/servicios/guardarServicio`, servicio);
  }
   public eliminarCorte(corteId: number): Observable<void> {
	  return this.httpClient.delete<void>(`${baserUrl}/api/cortes/eliminarCorte/${corteId}`);
  }
  
  public añadirCorte(corte: Corte): Observable<Corte> {
	  return this.httpClient.post<Corte>(`${baserUrl}/api/cortes/guardarCorte`, corte);
  }
   public eliminarEstilo(estiloId: number): Observable<void> {
	  return this.httpClient.delete<void>(`${baserUrl}/api/estilos/eliminarEstilo/${estiloId}`);
  }
  
  public añadirEstilo(estilo: Estilo): Observable<Estilo> {
	  return this.httpClient.post<Estilo>(`${baserUrl}/api/estilos/guardarEstilo`, estilo);
  }
}