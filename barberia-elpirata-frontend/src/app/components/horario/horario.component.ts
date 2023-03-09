import { Component,EventEmitter,Input,OnChanges,OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Cita, Horario } from 'src/app/model';
import { HorarioService } from 'src/app/services/horario.service';
import { CitaService } from 'src/app/services/cita.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { forkJoin, interval, map, mergeMap } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
    providers: [UserService]

})

export class HorarioComponent implements OnInit,OnChanges{
	
  	userRoles: string[];
  	@ViewChild(AlertComponent) alert: AlertComponent;
	@Output() fechaCitaCompleta =  new EventEmitter <Date | null>();
	public horasMa: string[] = [];
	public horasTa: string[] = [];
	todasLasCitas : Cita[];
  	horarios: Horario[];
  	@Input() calendarioSelecIni: Date;
  	myDate:Date;
  	diaSemanaDatePiPe:any;
  	horaReservadaManana: { [key: string]: number } = {};
  	horaReservadaTarde: { [key: string]: number } = {};

	constructor(		
		private horarioService:HorarioService,
		private citaService:CitaService,
		private authService: AuthService,
		private userService: UserService
	)
	{      

}
    ngOnChanges(changes: SimpleChanges): void {
		
			
		    if(this.calendarioSelecIni != null){
				  this.escribirHoras();
			}else{
				this.horasMa = [];
				this.horasTa = [];
			}
    }
	
    ngOnInit(): void {
    		
		/*interval(5000).subscribe(() => {
		      this.citaService.escucharTodasLasCitas();
		    }); */  
		    	this.citaService.escucharTodasLasCitas();	
		this.citaService.suscribirseATodasLasCitas().subscribe(citas => {
      	this.todasLasCitas = citas;
      	this.escribirHoras();

      // aquí puedes hacer cualquier cosa que necesites con las citas
   		});
    
        this.horarioService.todosLosHorarios().subscribe(horarios => {
      	this.horarios = horarios;    
    	});
    	
    	
    	     this.userRoles = this.authService.getUserRoles();

    }
deleteCita(cita: Cita){
	  	this.citaService.deleteCita(cita).subscribe(() => {

	    this.alert.show("success","La cita ha sido eliminada correctamente");
		
		}, error => {
	    console.error(error);
	    this.alert.show("error","Ha ocurrido un error al eliminar la cita");
	  });
	}
	escribirHoras(){
				if(this.isDateValid(this.calendarioSelecIni)){
					let nombreDia = this.calendarioSelecIni.toLocaleDateString('en-US', { weekday: 'long' });
					console.log(nombreDia);
					
						switch(nombreDia) {
						  case 'Sunday':
						    nombreDia = 'domingo';
						    break;
						  case 'Monday':
						    nombreDia = 'lunes';
						    break;
						  case 'Tuesday':
						    nombreDia = 'martes';
						    break;
						  case 'Wednesday':
						    nombreDia = 'miércoles';
						    break;
						  case 'Thursday':
						    nombreDia = 'jueves';
						    break;
						  case 'Friday':
						    nombreDia = 'viernes';
						    break;
						  case 'Saturday':
						    nombreDia = 'sábado';
						    break;
						}

					this.horasMa = [];
					this.horasTa = [];
				
					//Lunes
					for(let i= 0 ; i < this.horarios.length ; i++ ){
							/*console.log(i);
							console.log("dia semana:" + this.horarios[i].diaSemana.toLowerCase());
							console.log("pipe: "+ this.diaSemanaDatePiPe.toLowerCase())*/
						if(nombreDia == 
						this.horarios[i].diaSemana.toLowerCase()){
							this.generarHoras(this.horarios[i].hora_apertura_mañana.toString()
											,this.horarios[i].hora_cierre_mañana.toString()
											,this.horarios[i].hora_apertura_tarde.toString()
											,this.horarios[i].hora_cierre_tarde.toString());
							
							
						}
					}
					
				}	
	}
	 isDateValid(fecha:any): boolean {
    return !isNaN(Date.parse(fecha));
  } 
  
  generarHoras(aperturaManana: string, cierre_mañana: string, apertura_tarde: string, cierre_tarde: string): void {
  let hora_mañana = new Date('1970-01-01T' + aperturaManana + ':00');
  let cierre_mañana_date = new Date('1970-01-01T' + cierre_mañana + ':00');
  while (hora_mañana.getTime()  !== cierre_mañana_date.getTime()) {
    this.horasMa.push(this.formatTime(hora_mañana));
    hora_mañana.setMinutes(hora_mañana.getMinutes() + 5);
  }
/*  Para meter los ultimos 5 minutos  -> this.horasMa.push(cierre_mañana);
*/  for (const hora of this.horasMa) {
    this.horaReservadaManana[hora] = this.horaReservada(hora, this.todasLasCitas);
  }
  let hora_tarde = new Date('1970-01-01T' + apertura_tarde + ':00');
  let cierre_tarde_date = new Date('1970-01-01T' + cierre_tarde + ':00');
  while (hora_tarde.getTime() !== cierre_tarde_date.getTime()) {
    this.horasTa.push(this.formatTime(hora_tarde));
    hora_tarde.setMinutes(hora_tarde.getMinutes() + 5);
  }
/*  Para meter los ultimos 5 minutos  ->  this.horasTa.push(cierre_tarde);
*/  for (const hora of this.horasTa) {
    this.horaReservadaTarde[hora] = this.horaReservada(hora, this.todasLasCitas);
  }
}


  formatTime(date: Date): string {
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }


	fechaCita(event:any){console.log(event.target.textContent)
/*		event.classList.add("selected");
*/		let fechaCita = new Date(this.calendarioSelecIni);
		let horaMinuto = event.target.textContent.split(':');
		fechaCita.setHours(parseInt(horaMinuto[0]), parseInt(horaMinuto[1]));
		this.fechaCitaCompleta.emit(fechaCita);
	}
	
horaReservada(hora: string, todasLasCitas: Cita[]): number {
    const fechaActual = new Date();
    const calendarioSelecIni = this.calendarioSelecIni;
    const fechaActualStr = fechaActual.getFullYear() + '-' + (fechaActual.getMonth() + 1).toString().padStart(2, '0') + '-' + fechaActual.getDate().toString().padStart(2, '0');
    const calendarioSelecIniStr = calendarioSelecIni.getFullYear() + '-' + (calendarioSelecIni.getMonth() + 1).toString().padStart(2, '0') + '-' + calendarioSelecIni.getDate().toString().padStart(2, '0');
    const fechaActual2 = new Date();

    if (fechaActualStr === calendarioSelecIniStr) {
        const horaActualStr = fechaActual2.getHours().toString().padStart(2, '0') + ':' + fechaActual2.getMinutes().toString().padStart(2, '0');

        if (hora <= horaActualStr) {
			//hora que ya ha pasado
            return -1;
        }
    }

    for (const cita of todasLasCitas) {
        const citaFechaInicio = new Date(cita.fechaInicio);
        const citaFechaFin = new Date(cita.fechaFin);
        const citaHoraInicio = citaFechaInicio.getHours().toString().padStart(2, '0') + ':' + citaFechaInicio.getMinutes().toString().padStart(2, '0');
        const citaHoraFin = citaFechaFin.getHours().toString().padStart(2, '0') + ':' + citaFechaFin.getMinutes().toString().padStart(2, '0');
        const citaFechaInicioStr = citaFechaInicio.getFullYear() + '-' + (citaFechaInicio.getMonth() + 1).toString().padStart(2, '0') + '-' + citaFechaInicio.getDate().toString().padStart(2, '0');
        const citaFechaFinStr = citaFechaFin.getFullYear() + '-' + (citaFechaFin.getMonth() + 1).toString().padStart(2, '0') + '-' + citaFechaFin.getDate().toString().padStart(2, '0');

        if ((citaHoraInicio <= hora && citaHoraFin >= hora && calendarioSelecIniStr == citaFechaInicioStr)){
            
            if(citaHoraInicio == hora){
				//hora justa de incio de cita
				return 1
			}else{
				if(citaHoraFin == hora){
					
				}else{
					//resto de hora de cita
				return 2
				}
				
			}
        	}
    	}
    	//no reservada
    return 0;
}


}