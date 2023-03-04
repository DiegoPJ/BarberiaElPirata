import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Usuario } from 'src/app/model';
import { CitaService } from 'src/app/services/cita.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
	  usuarios: Usuario[] = [];

	constructor(private userService:UserService,
				private citaService:CitaService){
		
	}
    ngOnInit(): void {
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

}