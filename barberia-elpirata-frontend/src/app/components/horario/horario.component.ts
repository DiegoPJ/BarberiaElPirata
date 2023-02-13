import { Component,Input,OnInit } from '@angular/core';
import { Horario } from 'src/app/model';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})

export class HorarioComponent implements OnInit{
	
  	horarios: Horario[];
  	@Input() calendarioSelecIni: any;

	constructor(		
		private horarioService:HorarioService
	)
	{}
	
    ngOnInit(): void {
        this.horarioService.todosLosHorarios().subscribe(horarios => {
      	this.horarios = horarios;
    	});
    }
    handleDateSelected(date: Date) {
	  console.log("Fecha seleccionada: " + date);
	  // Aquí puedes hacer lo que necesites con la fecha seleccionada.
}
	
	
}