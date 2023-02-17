import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Barberia } from '../model';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ListaPreciosService {
	barberia:Barberia[];
  constructor(private httpClient :HttpClient) { }


public todaLaListaDeServicios(): Observable<Barberia[]>{
	  	  return this.httpClient.get<Barberia[]>(`${baserUrl}/api/barberia`);
  }
  

}