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
	roles: string[] = [] ; 
	usuario:any;
	usuarios?: Usuario[];
	calendarioSelecIni:Date;
	 todasLasCitas:Cita[] = [];
	credenciales:String | null;
	@Input() fechaCitaCompleta : Date;
	@ViewChild('horarioIni') horarioIni: HorarioComponent;
	horarioOcarga : boolean = false;
	 isLoggedIn: boolean = false;
 
constructor(	
	private userService:UserService,private citaService:CitaService,
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
		    this.todasLasCitas = citas;
		  });
    }
    ngOnInit(): void {

		this.citaService.escucharTodasLasCitas();
   		this.citaService.suscribirseATodasLasCitas().subscribe(citas => {
      	this.todasLasCitas = citas;

      // aquí puedes hacer cualquier cosa que necesites con las citas
   		});
	
	
	
	this.userService.todosLosUsuarios()
	.subscribe(usuarios => {
		this.usuarios = usuarios;
	})
		this.roles = JSON.parse(localStorage.getItem('roles') || '[]');
		console.log("ROLEEESS"+this.roles)
		console.log("ROLEEESS"+localStorage.getItem('roles'))
    }
    
    
    escuchaCalendario(event:any) {
		
	  this.calendarioSelecIni = event;
	  this.fechaCitaCompleta = event;
	  this.horarioOcarga = true;
	}
	eliminarCita(cita: Cita) {
  this.citaService.deleteCita(cita).subscribe(
    (response: any) => {

    },
    (error: any) => {
      console.log(error); // imprimir el error en la consola
      //this.alert.show('error', 'No puedes coger citas anteriores');
    }
  );
}
  logout(){
	  this.userService.logout();
	 // localStorage.removeItem('token');
	  localStorage.removeItem('credencial');
	      this.isLoggedIn = false;
  }
   
}

