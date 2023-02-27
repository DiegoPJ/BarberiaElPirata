import { Component,OnInit,Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { Servicio, Corte, Estilo, Cita, Usuario, Horario } from 'src/app/model';
import { ListaServiciosService } from 'src/app/services/lista-servicios.service';
import { CitaService } from 'src/app/services/cita.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { HorarioService } from 'src/app/services/horario.service';


@Component({
  selector: 'app-carro-servicio',
  templateUrl: './carro-servicio.component.html',
  styleUrls: ['./carro-servicio.component.css']
})
export class CarroServicioComponent implements OnInit {
	totalPrecio: number = 0;
	totalTiempo: number = 0;
	serviciosSeleccionados: any[] = [];
	servicios :Servicio[] = [];
	cortes : Corte[] = [];
	estilos : Estilo[] = [];
	@Input() fechaCitaCompleta: Date;
	tituloSeleccionado:String;
	cita: Cita;
    credenciales: string | null;
    usuario : any;
    @Output() nuevaCita = new EventEmitter<Cita>();
  	@ViewChild(AlertComponent) alert: AlertComponent;
	horarios : Horario [] = [];
	@Input() citas: Cita[] = [];
	 lista: String[];
	 mañanaFin: Date = new Date();
	 tardeFin: Date = new Date();
	 numCitas: number;
constructor(private listaServiciosService:ListaServiciosService,
			private citaService:CitaService,
			private userService:UserService,
			private horarioService:HorarioService){
	
}
    ngOnInit(): void {
			
			this.credenciales = localStorage.getItem("credencial");
			 this.userService.obtenerEmail(this.credenciales)
			    .pipe(
			      switchMap((usuario) => {
			        this.usuario = usuario;
			        return this.citaService.getCitasByUsuario(this.usuario.id);
			      })
			    )
			    .subscribe(citas => {
			      this.numCitas = citas.length;
			    });			
		 	this.cita = {
			id: 0,
			fechaInicio: new Date(),
			fechaFin:new Date(),
			usuario: { id: 0,nombre:"0",email:"0",telefono:"0",password:"0" },
			corte: [],
			estilo: [],
			servicio: [],
			precio: 0
		};
		
		
        forkJoin({
      servicios: this.listaServiciosService.todaLaListaDeServicios(),
      cortes: this.listaServiciosService.todaLaListaDeServiciosCorte(),
      estilos: this.listaServiciosService.todaLaListaDeServiciosEstilo()
    }).subscribe(
      ({ servicios, cortes, estilos }) => {
        this.servicios = servicios;
        for (const corte of cortes) {
          corte.estilos = estilos.filter(e => e.corte.id === corte.id);
        }
        for (const barberia of servicios) {
          barberia.cortes = cortes.filter(c => c.servicio.id === barberia.id);
        }
      }
    );
     this.horarioService.todosLosHorarios().subscribe(horarios => {
      	this.horarios = horarios;    
    	});

    }
 	actualizarNumCitas(){
		  this.userService.obtenerEmail(this.credenciales)
			    .pipe(
			      switchMap((usuario) => {
			        this.usuario = usuario;
			        return this.citaService.getCitasByUsuario(this.usuario.id);
			      })
			    )
			    .subscribe(citas => {
			      this.numCitas = citas.length;
			    });	
	 }
	seleccionarServicio(x: any) {
			const nombre = x.corte?.servicio.nombre || x.servicio?.nombre || x.nombre;
			
			let servicioExistente = this.serviciosSeleccionados.find(s => 
		    (s.corte?.servicio?.nombre === nombre ||
		    s.servicio?.nombre === nombre || 
		    s.nombre === nombre));	
				
			for(let servicio of this.servicios){
				if (servicioExistente){
					if(nombre == servicio.nombre){
			 	 this.alert.show('error', 'Ya tienes un servicio de '+ servicio.nombre);
				}
				}
				
			}
				
			if (!servicioExistente) {
			  this.serviciosSeleccionados.push(x);
			  this.totalPrecio += x.precio;
			  this.totalTiempo += x.tiempo;
			}else{
				console.log(JSON.stringify(servicioExistente));
			}
					
	}
	quitarServicio(x: any) {
	  const index = this.serviciosSeleccionados.indexOf(x);
	  if (index !== -1) {
	    this.serviciosSeleccionados.splice(index, 1);
	          this.totalPrecio -= x.precio;
	          this.totalTiempo -= x.tiempo;
	  }
	
	}
	finalizarCompra(){
		  if(this.serviciosSeleccionados.length == 0){
			  this.alert.show('error','selecciona un servicio antes de avanzar')
		  }
	}
	modalCortes(servicio: Servicio) {
	  this.cortes = servicio.cortes;
	  this.tituloSeleccionado = servicio.nombre;
	}
	modalEstilos(corte: Corte) {
	  this.estilos = corte.estilos;
	  this.tituloSeleccionado = corte.nombre;
	}
		
compararFechaCompletaConHoras(fechaCompleta: Date, horasMinutos: String[]) {
  const [horaManana, minManana] = horasMinutos[0].split(':');
  const [horaTarde, minTarde] = horasMinutos[1].split(':');
  const horaLimiteManana = new Date(fechaCompleta.getFullYear(), fechaCompleta.getMonth(), fechaCompleta.getDate(), Number(horaManana), Number(minManana), 0, 0);
  const horaLimiteTarde = new Date(fechaCompleta.getFullYear(), fechaCompleta.getMonth(), fechaCompleta.getDate(), Number(horaTarde), Number(minTarde), 0, 0);

				if (fechaCompleta.getHours() <= 15 && fechaCompleta.getMinutes() < 30){
					//mañana
					if(fechaCompleta.getTime() > horaLimiteManana.getTime()){
						return true;
					}
					return false;
				}else{
					//tarde

					if(fechaCompleta.getTime() > horaLimiteTarde.getTime()){

						return true;
					}
					return false;

				}
				
}
	horarioFinMañanaYTarde(fecha:any){
			let nombreDia = fecha.toLocaleDateString('en-US', { weekday: 'long' });
			let horarioFin: String[] = [];
					
						switch(nombreDia) {
						  case 'Sunday':
						    nombreDia = 'domingo';
						    break;
						  case 'Monday':
						    nombreDia = 'lunes';
						    break;
						  case 'Tuesday':
						    nombreDia = 'martes';
						    break;
						  case 'Wednesday':
						    nombreDia = 'miércoles';
						    break;
						  case 'Thursday':
						    nombreDia = 'jueves';
						    break;
						  case 'Friday':
						    nombreDia = 'viernes';
						    break;
						  case 'Saturday':
						    nombreDia = 'sábado';
						    break;
						}
				
					//Lunes
					for(let i= 0 ; i < this.horarios.length ; i++ ){
							/*console.log(i);
							console.log("dia semana:" + this.horarios[i].diaSemana.toLowerCase());
							console.log("pipe: "+ this.diaSemanaDatePiPe.toLowerCase())*/
						if(nombreDia == 
						this.horarios[i].diaSemana.toLowerCase()){
							horarioFin.push(this.horarios[i].hora_cierre_mañana);
							horarioFin.push(this.horarios[i].hora_cierre_tarde);

							return horarioFin;
							
						}

					}
				return horarioFin;

	}
	guardarCita(){
	if(this.numCitas >= 4){
		this.alert.show('error','No puedes tener mas de 4 citas asociadas');
			      this.totalPrecio = 0;
				  this.totalTiempo = 0;
				  this.serviciosSeleccionados.splice(0, this.serviciosSeleccionados.length);
				  return;
	}
	const corte = this.serviciosSeleccionados.filter(s => s.servicio);
	const estilo = this.serviciosSeleccionados.filter(s => s.corte);
	const servicio = this.serviciosSeleccionados.filter(s => !s.servicio && !s.corte);
	if(this.totalTiempo > 30){
		this.cita.fechaInicio = this.fechaCitaCompleta;
		let nuevaFecha = new Date(this.fechaCitaCompleta.getTime() + 30 * 60 * 1000); 
		if(this.compararFechaCompletaConHoras(nuevaFecha,this.horarioFinMañanaYTarde(nuevaFecha))){
			this.alert.show('error','NNNecesita mas de 30 min para los servicios seleccionados.'+ 
			    'Seleccione otra hora que tenga espacio para 1 hora o reduzca los servicios');
			      this.totalPrecio = 0;
				  this.totalTiempo = 0;
				  this.serviciosSeleccionados.splice(0, this.serviciosSeleccionados.length);
			return;
		}		
		
			for (let cita of this.citas) {
				
				let fechaInicio = new Date(cita.fechaInicio)
				let fechaFin = new Date(cita.fechaFin)
				
			  if (fechaInicio.getTime()<= nuevaFecha.getTime() &&
			   fechaFin.getTime() >= nuevaFecha.getTime()) {
			    this.alert.show('error','Necesita mas de 30 min para los servicios seleccionados.'+ 
			    'Seleccione otra hora que tenga espacio para 1 hora o reduzca los servicios');
			    this.totalPrecio = 0;
			 	 this.totalTiempo = 0;
			 	 this.serviciosSeleccionados.splice(0, this.serviciosSeleccionados.length);
			    return;
			  }

			}
		this.cita.fechaFin = nuevaFecha;

	}else{
		this.cita.fechaInicio = this.fechaCitaCompleta;
		this.cita.fechaFin = this.fechaCitaCompleta;
	}
	this.cita.servicio = servicio;
	this.cita.corte = corte;
	this.cita.estilo = estilo;
	this.cita.usuario = this.usuario;
	this.cita.precio = this.totalPrecio;
	this.citaService.añadirCita(this.cita).subscribe(
			(data) => {
				this.nuevaCita.emit(this.cita);
				this.totalPrecio = 0;
			 	 this.totalTiempo = 0;
			 	 this.serviciosSeleccionados.splice(0, this.serviciosSeleccionados.length);
			 	 this.actualizarNumCitas();
			},(error) => {
				console.log(error);
				this.totalPrecio = 0;
			 	 this.totalTiempo = 0;
			 	 this.serviciosSeleccionados.splice(0, this.serviciosSeleccionados.length);
			}
			
		)
	
	}
}
