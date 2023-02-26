import { AfterViewInit, Component, ElementRef, Input, OnInit,Output,ViewChild } from '@angular/core';
import { switchMap } from 'rxjs';
import { Cita, Usuario } from 'src/app/model';
import { CitaService } from 'src/app/services/cita.service';
import { UserService } from 'src/app/services/user.service';
import { HorarioComponent } from 'src/app/components/horario/horario.component';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit,AfterViewInit{
	usuario:any;
	usuarios?: Usuario[];
	calendarioSelecIni:Date;
	@Input() citas:Cita[] = [];
	credenciales:String | null;
	@Input() fechaCitaCompleta : Date;
	@ViewChild('horarioIni') horarioIni: HorarioComponent;
	horarioOcarga : boolean = false;
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
    actualizarCitas(){
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
		    this.horarioIni.escribirHoras();

		    console.log("se ha actualizado")
		  });
	}
    escuchaCalendario(event:any) {
		
	  this.calendarioSelecIni = event;
	  this.fechaCitaCompleta = event;
	  this.horarioOcarga = true;
	}
	eliminarCita(cita: Cita) {
  this.citaService.deleteCita(cita).subscribe(
    (response: any) => {
      console.log(response); // imprimir la respuesta del servidor en la consola
      this.actualizarCitas()
    },
    (error: any) => {
      console.log(error); // imprimir el error en la consola
      //this.alert.show('error', 'No puedes coger citas anteriores');
      this.actualizarCitas()

    }
  );
}
   
}

