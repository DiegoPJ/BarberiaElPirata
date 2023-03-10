import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cita } from '../model';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private todasLasCitas: BehaviorSubject<Cita[]> = new BehaviorSubject<Cita[]>([]);


  constructor(private httpClient :HttpClient,private datePipe: DatePipe) { }
  
	public deleteCita(cita: Cita) {
		console.log(cita);
  	return this.httpClient.delete(`${baserUrl}/api/eliminarCita/${cita.id.toString()}`, { responseType: 'text' }).pipe(
    tap(() => {
      // actualizar el valor del BehaviorSubject manualmente
      this.todasLasCitas.next(this.todasLasCitas.value.filter(c => c.id !== cita.id));
    })
  );
}


public añadirCita(cita: Cita): Observable<Cita> {
  return this.httpClient.post<Cita>(`${baserUrl}/api/guardarCita`, cita).pipe(
    tap(citaCreada => {
      this.todasLasCitas.next([...this.todasLasCitas.value, citaCreada]);
    })
  );
}

public getCitaByFecha(fechaInicio: Date): Observable<Cita> {
const formattedDate = fechaInicio.toLocaleString('es-ES', { timeZone: 'Europe/Madrid', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', '');
  const url = `${baserUrl}/api/citas/buscarPorFecha`;
  const params = { fechaInicio: formattedDate };

  return this.httpClient.get<Cita>(url, { params });
}







 /*  
   public obtenerUsuario(email:any){
	  return this.httpClient.get(`${baserUrl}/usuarios/${email}`);
  }*/
  public todosLasCitas(): Observable<Cita[]>{
	  	  return  this.httpClient.get<Cita[]>(`${baserUrl}/api/citas`);
  }
  public getCitasByUsuario(id_usuario: number): Observable<Cita[]> {
  return this.httpClient.get<Cita[]>(`${baserUrl}/api/citas/${id_usuario}`);
	}
  
    
    public escucharTodasLasCitas() {
    this.todosLasCitas().subscribe(citas => {
      this.todasLasCitas.next(citas);
    });
  }

  public suscribirseATodasLasCitas(): Observable<Cita[]> {
  if (!this.todasLasCitas.getValue().length) {
    this.todosLasCitas().subscribe(citas => {
      this.todasLasCitas.next(citas);
    });
  }
  return this.todasLasCitas.asObservable();
}
 }