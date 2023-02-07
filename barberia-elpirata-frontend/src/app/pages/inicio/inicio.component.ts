import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit{
	
	usuarios?: Usuario[];
	count	
	 today = new Date();
	 currentMonth = this.today.getMonth();
	 currentYear = this.today.getFullYear();

// Obtener el último día del mes
	 lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);

// Obtener el número de días en el mes
	 daysInMonth = this.lastDayOfMonth.getDate();
constructor(	
	private userService:UserService
){
}
    ngOnInit(): void {
	this.userService.todosLosUsuarios()
	.subscribe(usuarios => {
		this.usuarios = usuarios;
	})
	console.log(localStorage.getItem("credencial"))
    }
   
}

