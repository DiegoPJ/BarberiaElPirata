import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
	
	productos : Producto;
  constructor(private httpClient : HttpClient) { }
  
   public todosLasCitas(): Observable<Producto[]>{
	  	  return this.httpClient.get<Producto[]>(`${baserUrl}/api/productos`);
  }
}
