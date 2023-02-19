import { AfterViewInit, Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { switchMap } from 'rxjs';
import { Cita, Usuario } from 'src/app/model';
import { CitaService } from 'src/app/services/cita.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit,AfterViewInit{
	usuario:any;
	usuarios?: Usuario[];
	calendarioSelecIni:Date;
	citas:Cita[];
	credenciales:String | null;
constructor(	
	private userService:UserService,private citaService:CitaService
){
}

    ngAfterViewInit(): void {
		this.credenciales = localStorage.getItem("credencial");
		this.userService.obtenerEmail(this.credenciales)
		  .pipe(
		    switchMap(usuario => {
		      this.usuario = usuario;
		      return this.citaService.getCitasByUsuario(this.usuario.id);
		    })
		  )
		  .subscribe(citas => {
		    this.citas = citas;
		  });
    	
    }
    ngOnInit(): void {

	/*
	
	
	
	this.userService.todosLosUsuarios()
	.subscribe(usuarios => {
		this.usuarios = usuarios;
	})
	console.log(localStorage.getItem("credencial"))*/

    }
    escuchaCalendario(event:any) {
	  this.calendarioSelecIni = event;
	}
   
}

