 import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import baserUrl from './helper';
import { map, Observable } from 'rxjs';
import { Credenciales, Usuario } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient :HttpClient) { }
  
  public añadirUsuario(user:any){
	  return this.httpClient.post(`${baserUrl}/api/usuarios/`,user);
  }
   
   public obtenerEmail(email:any){
	  return this.httpClient.get(`${baserUrl}/api/usuarios/${email}`);
  }
  public todosLosUsuarios(): Observable<Usuario[]>{
	  	  return this.httpClient.get<Usuario[]>(`${baserUrl}/api/usuarios/todosLosUsuarios`);
  }
  
  
  login(credenciales : Credenciales){
	  
	  return this.httpClient.post(`${baserUrl}/login` , credenciales,  {
		  observe: 'response'
	  }).pipe(map((response: HttpResponse<any>)=> {
		  const body = response.body;
		  const headers = response.headers;
		  
		  const bearerToken = headers.get('Authorization')!;
		  const token = bearerToken?.replace('Bearer ','');
		  
		  localStorage.setItem('token',token);
		   localStorage.setItem('credencial',credenciales.email);
		  return body;
	  })); 
  }
  
  getToken(){
	  return localStorage.getItem('token');
  }
  getCredencial(){
	  return localStorage.getItem('credencial');
  }
  logout() {
    return this.httpClient.post(`${baserUrl}/logout`, {}).toPromise();
  }

  clearSession() {
    return this.httpClient.get(`${baserUrl}/clearSession`).toPromise();
  }
}
