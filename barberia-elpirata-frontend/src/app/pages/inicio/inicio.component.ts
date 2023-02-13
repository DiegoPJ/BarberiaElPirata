import { AfterViewInit, Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { Usuario } from 'src/app/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit,AfterViewInit{
	
	usuarios?: Usuario[];
	calendarioSelecIni:Date;
constructor(	
	private userService:UserService
){
}

    ngAfterViewInit(): void {
		
    }
    ngOnInit(): void {

	/*this.userService.todosLosUsuarios()
	.subscribe(usuarios => {
		this.usuarios = usuarios;
	})
	console.log(localStorage.getItem("credencial"))*/

    }
    escuchaCalendario(event:any) {
	  this.calendarioSelecIni = event;
	}
   
}

