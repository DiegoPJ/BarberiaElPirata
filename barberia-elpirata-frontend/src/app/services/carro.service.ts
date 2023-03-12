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
  
   public todosLosProductos(): Observable<Producto[]>{
	  	  return this.httpClient.get<Producto[]>(`${baserUrl}/api/productos/todosLosProductos`);
  }
  public eliminarProducto(productoId: number): Observable<void> {
	  return this.httpClient.delete<void>(`${baserUrl}/api/productos/eliminarProducto/${productoId}`);
  }
  
  public añadirProducto(producto: Producto): Observable<Producto> {
	  return this.httpClient.post<Producto>(`${baserUrl}/api/productos/guardarProducto`, producto);
  }
}
