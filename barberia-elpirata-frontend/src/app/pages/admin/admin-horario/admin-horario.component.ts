import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Horario } from 'src/app/model';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-admin-horario',
  templateUrl: './admin-horario.component.html',
  styleUrls: ['./admin-horario.component.css']
})
export class AdminHorarioComponent implements OnInit{

  	horarios: Horario[];
	horarioEditable :  Horario;
	horarioForm :FormGroup;
constructor(		
		private horarioService:HorarioService,private formBuilder: FormBuilder
		)
		{}
    ngOnInit(): void {
	this.horarioEditable={
		id:-1,diaSemana:'',hora_apertura_manana:'',hora_apertura_tarde:'',hora_cierre_manana:'',hora_cierre_tarde:''
	}
 this.horarioService.todosLosHorarios().subscribe(horarios => {
      	this.horarios = horarios;    
    	});
    	this.horarioForm = this.formBuilder.group({
      diaSemana: ['', Validators.required],
      hora_apertura_manana: ['', Validators.required],
      hora_apertura_tarde: ['', Validators.required],
      hora_cierre_manana: ['', Validators.required],
      hora_cierre_tarde: ['', Validators.required]
    });
    	    }
    	    
    	      agregarHorario() {
		 
		  if (this.horarioForm.valid) {
      const horario: Horario = {
        diaSemana: this.horarioForm.value.diaSemana,
        hora_apertura_manana: this.horarioForm.value.hora_apertura_manana,
        hora_apertura_tarde: this.horarioForm.value.hora_apertura_tarde,
        hora_cierre_manana: this.horarioForm.value.hora_cierre_manana,
        hora_cierre_tarde: this.horarioForm.value.hora_cierre_tarde,
        id: -1
      };
		 
	this.horarioService.añadirHorario(horario).subscribe(
		(horarioActualizado) => {
		console.log(horarioActualizado);
		

		// Manejar la respuesta del servidor aquí
		},
		(error) => {
		console.log(error);
		// Manejar el error aquí
		}
	);
}
}
	editarHorario(horario : Horario){
		this.horarioService.añadirHorario(horario).subscribe(
		(horarioActualizado) => {
		console.log(horarioActualizado);
		

		// Manejar la respuesta del servidor aquí
		},
		(error) => {
		console.log(error);
		// Manejar el error aquí
		}
	);
	}
	

}
