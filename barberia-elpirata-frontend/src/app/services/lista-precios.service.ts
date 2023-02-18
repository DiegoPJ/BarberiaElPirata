import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Barberia, Corte, Estilo } from '../model';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ListaPreciosService {
  constructor(private httpClient :HttpClient) { }


public todaLaListaDeServiciosBarberia(): Observable<Barberia[]>{
	  	  return this.httpClient.get<Barberia[]>(`${baserUrl}/api/barberias`);
  }

public todaLaListaDeServiciosCorte(): Observable<Corte[]>{
	  	  return this.httpClient.get<Corte[]>(`${baserUrl}/api/cortes`);
  }
public todaLaListaDeServiciosEstilo(): Observable<Estilo[]>{
	  	  return this.httpClient.get<Estilo[]>(`${baserUrl}/api/estilos`);
  }

}