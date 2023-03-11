import { AfterViewInit, Component, ElementRef, Input, OnInit,Output,ViewChild } from '@angular/core';
import { interval, switchMap } from 'rxjs';
import { Cita, Usuario } from 'src/app/model';
import { CitaService } from 'src/app/services/cita.service';
import { UserService } from 'src/app/services/user.service';
import { HorarioComponent } from 'src/app/components/horario/horario.component';
import { AuthService } from 'src/app/services/auth.service';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})

export class CitaComponent implements OnInit,AfterViewInit{
	usuario:any;
	usuarios?: Usuario[];
	calendarioSelecIni:Date;
	 todasLasCitas:Cita[] = [];
	credenciales:String | null;
	@Input() fechaCitaCompleta : Date;
	@ViewChild('horarioIni') horarioIni: HorarioComponent;
	horarioOcarga : boolean = false;
	 isLoggedIn: boolean = false;
 	misCitas : Cita[] = [];
 	  	userRoles: string[];

constructor(	
	private userService:UserService,private citaService:CitaService,private authService :AuthService
){
	
}

    ngAfterViewInit(): void {
		
    }
    ngOnInit(): void {

      	this.credenciales = localStorage.getItem('credencial')
      	
      	/*interval(5000).subscribe(() => {
				this.actualizarMisCitas();
		    }); */
   		this.citaService.suscribirseATodasLasCitas().subscribe(citas => {
      	this.todasLasCitas = citas;

      // aquí puedes hacer cualquier cosa que necesites con las citas
   		});
	
	    	 this.userRoles = this.authService.getUserRoles();
		this.actualizarMisCitas();
	
	this.userService.todosLosUsuarios()
	.subscribe(usuarios => {
		this.usuarios = usuarios;
	})

    
   
}
  generateExcel(): void {
	  const citasParaExcel: any[][] = [];
for (const cita of this.todasLasCitas) {
  const fila: any[] = [
    cita.usuario.nombre,
    formatDate(cita.fechaInicio, 'yyyy-MM-dd HH:mm', 'en-US'),
    cita.nombre,
    cita.usuario.telefono
  ];
  citasParaExcel.push(fila);
}

    const worksheet = XLSX.utils.aoa_to_sheet(citasParaExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Citas');
    XLSX.writeFile(workbook, 'citas.xlsx');
  }

actualizarMisCitas(){
		  this.userService.obtenerEmail(this.credenciales)
			    .pipe(
			      switchMap((usuario) => {
			        this.usuario = usuario;
			        return this.citaService.getCitasByUsuario(this.usuario.id);
			      })
			    )
			    .subscribe(citas => {
			      this.misCitas = citas;

			    });	
	 }
    eliminarCita(cita: Cita) {
	  this.citaService.deleteCita(cita).subscribe(
	    (response: any) => {
			this.actualizarMisCitas();
	    },
	    (error: any) => {
	      console.log(error); // imprimir el error en la consola
	      //this.alert.show('error', 'No puedes coger citas anteriores');
	    }
	  );
  }
    escuchaCalendario(event:any) {
	  this.calendarioSelecIni = event;
	  this.fechaCitaCompleta = event;
	  this.horarioOcarga = true;
	}
	

  logout(){
	  this.userService.logout();
	 // localStorage.removeItem('token');
	  localStorage.removeItem('credencial');
	      this.isLoggedIn = false;
  }
}
