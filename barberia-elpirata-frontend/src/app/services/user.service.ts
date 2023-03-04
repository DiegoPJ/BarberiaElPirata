 import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import baserUrl from './helper';
import { map, Observable } from 'rxjs';
import { Credenciales, Usuario } from '../model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient :HttpClient) { }
  
  public añadirUsuario(user:any){
	  return this.httpClient.post(`${baserUrl}/api/usuarios/guardarUsuario`,user);
  }
   
   public obtenerEmail(email:any){
	  return this.httpClient.get(`${baserUrl}/api/usuarios/${email}`);
  }
  public todosLosUsuarios(): Observable<Usuario[]>{
	  	  return this.httpClient.get<Usuario[]>(`${baserUrl}/api/usuarios/todosLosUsuarios`);
  }
  public todosLosUsuariosConCitas(): Observable<Usuario[]>{
	  	  return this.httpClient.get<Usuario[]>(`${baserUrl}/api/usuarios/todosLosUsuariosConCitas`);
  }
  
  login(credenciales : Credenciales){
	  
	  return this.httpClient.post(`${baserUrl}/login` , credenciales,  {
		  observe: 'response'
	  }).pipe(map((response: HttpResponse<any>)=> {
		  const body = response.body;
		  const headers = response.headers;
		  
		  const bearerToken = headers.get('Authorization')!;
		  const token = bearerToken?.replace('Bearer ','');
		  const tokenData = jwt_decode(token) as any;
		  const roles = tokenData.roles;
		  const credencial = tokenData.sub
		   localStorage.setItem('token',token);
			localStorage.setItem('roles', JSON.stringify(roles));
		   localStorage.setItem('credencial',credencial);
		  return body;
	  })); 
  }
  
  getToken(){
	  return localStorage.getItem('token');
  }
  getCredencial(){
	  return localStorage.getItem('credencial');
  }
  getRoles(){
	  return localStorage.getItem('roles');
  }
  logout() {
    return this.httpClient.post(`${baserUrl}/logout`, {}).toPromise();
  }

  clearSession() {
    return this.httpClient.get(`${baserUrl}/clearSession`).toPromise();
  }
}
