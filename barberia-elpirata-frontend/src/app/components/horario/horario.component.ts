import { Component,Input,OnChanges,OnInit, SimpleChanges } from '@angular/core';
import { Cita, Horario } from 'src/app/model';
import { HorarioService } from 'src/app/services/horario.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})

export class HorarioComponent implements OnInit,OnChanges{
	
	
	public horasMa: string[] = [];
	public horasTa: string[] = [];

  	horarios: Horario[];
  	citas: Cita[];
  	@Input() calendarioSelecIni: Date;
  	myDate:Date;
  	diaSemanaDatePiPe:any;
	constructor(		
		private horarioService:HorarioService,
		private datePipe: DatePipe,
		private citaService:CitaService
	)
	{  
}
    ngOnChanges(changes: SimpleChanges): void {
			console.log(changes['calendarioSelecIni']);
			if(this.calendarioSelecIni != null){
				      	this.escribirHoras();
			}else{
				this.horasMa = [];
				this.horasTa = [];
			}
    }
	
    ngOnInit(): void {
        this.horarioService.todosLosHorarios().subscribe(horarios => {
      	this.horarios = horarios;    	      				 
    	});
    	
    	this.citaService.todosLasCitas().subscribe(citas => {
      	this.citas = citas;  
      	console.log(citas);  	      				 
    	});
    }
	escribirHoras(){
				if(this.isDateValid(this.calendarioSelecIni)){
					this.myDate = new Date(this.calendarioSelecIni);
					this.diaSemanaDatePiPe = this.datePipe.transform(this.myDate, 'EEEE', 'es'); 
					this.horasMa = [];
					this.horasTa = [];
				
					//Lunes
					for(let i= 0 ; i < this.horarios.length ; i++ ){
							/*console.log(i);
							console.log("dia semana:" + this.horarios[i].diaSemana.toLowerCase());
							console.log("pipe: "+ this.diaSemanaDatePiPe.toLowerCase())*/
						if(this.diaSemanaDatePiPe.toLowerCase() == 
						this.horarios[i].diaSemana.toLowerCase()){
							
							this.generarHoras(this.horarios[i].hora_apertura_mañana
											,this.horarios[i].hora_cierre_mañana
											,this.horarios[i].hora_apertura_tarde
											,this.horarios[i].hora_cierre_tarde);
							
							
						}
					}
					
				}	
	}
	 isDateValid(fecha:any): boolean {
    return !isNaN(Date.parse(fecha));
  } 
  
  generarHoras(apertura_mañana:any,cierre_mañana:any
  				,apertura_tarde:any,cierre_tarde:any): void {
		
	  let hora_mañana: moment.Moment = moment(apertura_mañana, 'HH:mm');
	  while (hora_mañana.format('HH:mm') !== cierre_mañana) {
	    this.horasMa.push(hora_mañana.format('HH:mm'));
	    hora_mañana = hora_mañana.add(30, 'minutes');
	  }

  	this.horasMa.push(cierre_mañana);
  	
  	 let hora_tarde: moment.Moment = moment(apertura_tarde, 'HH:mm');
	  while (hora_tarde.format('HH:mm') !== cierre_tarde) {
	    this.horasTa.push(hora_tarde.format('HH:mm'));
	    hora_tarde = hora_tarde.add(30, 'minutes');
	  }

  	this.horasTa.push(cierre_tarde);
}

	fechaCita(event:any){
		let fechaCita = new Date(this.calendarioSelecIni);
		let horaMinuto = event.target.textContent.split(':');
		fechaCita.setHours(parseInt(horaMinuto[0]), parseInt(horaMinuto[1]));
		alert(fechaCita);
	}
	
	horaReservada(hora: string, citas: Cita[]): boolean {
	  for (const cita of citas) {

	    if (moment(cita.fecha).format('HH:mm') === hora 
	    && this.convertirFechaAEspana(this.calendarioSelecIni).getTime()
	     == this.convertirFechaAEspana(cita.fecha).getTime()) {
	      console.log("cita.fecha: "+ moment(cita.fecha).format('HH:mm'));
		  console.log("hora:" +hora);
		  console.log("this.calendarioSelecIni: " + this.convertirFechaAEspana(this.calendarioSelecIni))
		  console.log("cita.fecha.completa: "+ this.convertirFechaAEspana(cita.fecha))
	      return true;
	    }
	  }
	  return false;
	}

convertirFechaAEspana(fecha:Date) {
  // Crear un objeto de tipo Date a partir de la fecha dada
  const date = new Date(fecha);

  // Obtener la fecha solo con año, mes y día en la zona horaria de España
  const fechaEspaña = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0, // hora
      0, // minutos
      0, // segundos
      0 // milisegundos
    )
  );
  fechaEspaña.setTime(fechaEspaña.getTime() + (60 * 60 * 1000)); // Ajustar una hora para España

  return fechaEspaña;
}
}