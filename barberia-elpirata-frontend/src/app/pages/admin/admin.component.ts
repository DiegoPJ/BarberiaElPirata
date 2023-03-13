import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { Cita, Corte, Estilo, Servicio, Usuario } from 'src/app/model';
import { CitaService } from 'src/app/services/cita.service';
import { ListaServiciosService } from 'src/app/services/lista-servicios.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
	  usuarios: Usuario[] = [];
  	@ViewChild(AlertComponent) alert: AlertComponent;
  	
mostrarCitas = false;

	constructor(private userService:UserService,
				private citaService:CitaService,
				private listaServiciosService:ListaServiciosService){		
					
	}
    ngOnInit(): void {
			
		//USUARIOS
	 this.userService.todosLosUsuarios().subscribe(usuarios => {
	  const citasObservables = usuarios.map(usuario => {
	    return this.citaService.getCitasByUsuario(usuario.id);
	  });
	  forkJoin(citasObservables).subscribe(citasPorUsuario => {
	    usuarios.forEach((usuario, i) => {
	      usuario.citas = citasPorUsuario[i].sort((a, b) => new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime());
	    });
	    this.usuarios = usuarios.sort((a, b) => {
	      const primeraCitaA = a.citas.length > 0 ? new Date(a.citas[0].fechaInicio) : null;
	      const primeraCitaB = b.citas.length > 0 ? new Date(b.citas[0].fechaInicio) : null;
	      if (primeraCitaA && primeraCitaB) {
	        return primeraCitaA.getTime() - primeraCitaB.getTime();
	      } else if (!primeraCitaA && !primeraCitaB) {
	        return a.id - b.id;
	      } else if (!primeraCitaA) {
	        return 1;
	      } else {
	        return -1;
	      }
	    });
	  });
	});
	
    }
	deleteCita(cita: Cita){
	  this.citaService.deleteCita(cita).subscribe(() => {
	    this.alert.show("success","La cita ha sido eliminada correctamente");
	  }, error => {
	    console.error(error);
	    this.alert.show("error","Ha ocurrido un error al eliminar la cita");
	  });
	}
	deleteUsuario(usuario: Usuario){
	  this.userService.deleteUsuario(usuario).subscribe(() => {
	    this.alert.show("success","El usuario ha sido eliminada correctamente");
	  }, error => {
	    console.error(error);
	    this.alert.show("error","Ha ocurrido un error al eliminar el usuario");
	  });
	}
	toggleCitas() {
  this.mostrarCitas = !this.mostrarCitas;
}	




}
