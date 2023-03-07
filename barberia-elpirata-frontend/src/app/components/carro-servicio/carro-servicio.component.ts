import { Component,OnInit,Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { Servicio, Corte, Estilo, Cita, Usuario, Horario } from 'src/app/model';
import { ListaServiciosService } from 'src/app/services/lista-servicios.service';
import { CitaService } from 'src/app/services/cita.service';
import { UserService } from 'src/app/services/user.service';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { HorarioService } from 'src/app/services/horario.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-carro-servicio',
  templateUrl: './carro-servicio.component.html',
  styleUrls: ['./carro-servicio.component.css']
})
export class CarroServicioComponent implements OnInit {
	  userRoles: string[];
  formulario: FormGroup;

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
	todasLasCitas: Cita[] = [];
	lista: String[];
	mañanaFin: Date = new Date();
	tardeFin: Date = new Date();
	numCitas: number;
	 
constructor(private listaServiciosService:ListaServiciosService,
			private citaService:CitaService,
			private userService:UserService,
			private horarioService:HorarioService,
			private authService: AuthService,
			    private formBuilder: FormBuilder,
){
	  this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
}
    ngOnInit(): void {
			    	     this.userRoles = this.authService.getUserRoles();

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
			nombre:"0",
			fechaInicio: new Date(),
			fechaFin:new Date(),
			usuario: { id: 0,nombre:"0",email:"0",telefono:"0",password:"0", roles: [{ rolId: 0, nombre: "0" }],citas: []},
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
				
				if (fechaCompleta.getHours() <= 15 && fechaCompleta.getMinutes() <= 30){
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
	if (!this.userRoles.includes('ROLE_ADMIN') && this.numCitas >= 4) {
	  this.alert.show('error', 'No puedes tener más de 4 citas asociadas');
	  this.totalPrecio = 0;
	  this.totalTiempo = 0;
	  this.serviciosSeleccionados.splice(0, this.serviciosSeleccionados.length);
	  return;
	}
	const corte = this.serviciosSeleccionados.filter(s => s.servicio);
	const estilo = this.serviciosSeleccionados.filter(s => s.corte);
	const servicio = this.serviciosSeleccionados.filter(s => !s.servicio && !s.corte);
			
		let fechaCitaCompletaFin = new Date(this.fechaCitaCompleta.getTime() + this.totalTiempo * 60000); 
		let fechaCitaCompletaIni = this.fechaCitaCompleta;
			console.log("total tiempo" + this.totalTiempo)
			console.log(this.fechaCitaCompleta);
			console.log(fechaCitaCompletaFin);
		if(this.compararFechaCompletaConHoras(fechaCitaCompletaFin,this.horarioFinMañanaYTarde(fechaCitaCompletaFin))){
			this.alert.show('error','Necesita mas de '+this.totalTiempo + ' minutos para los servicios seleccionados.'+ 
			    'Seleccione otra hora disponible');
			      this.totalPrecio = 0;
				  this.totalTiempo = 0;
				  this.serviciosSeleccionados.splice(0, this.serviciosSeleccionados.length);
			return;
		}		
				this.citaService.todosLasCitas().subscribe(citas => {
				  this.todasLasCitas = citas;
				});		

				for (let cita of this.todasLasCitas) {

				let citaInicio = new Date(cita.fechaInicio)
				let citaFin = new Date(cita.fechaFin)
				
			  if ((fechaCitaCompletaIni.getTime() >= citaInicio.getTime() && fechaCitaCompletaIni.getTime() < citaFin.getTime()) ||
			      (fechaCitaCompletaFin.getTime() > citaInicio.getTime() && fechaCitaCompletaFin.getTime() <= citaFin.getTime())) {
			    this.alert.show('error','Tu tiempo de servicios es '+this.totalTiempo + ' y se superpone con otra cita existente.'+ 
			    'Seleccione otra hora disponible');
			    this.totalPrecio = 0;
			 	 this.totalTiempo = 0;
			 	 this.serviciosSeleccionados.splice(0, this.serviciosSeleccionados.length);
			    return;
			  }
			}
			
	this.cita.fechaFin = fechaCitaCompletaFin;
	this.cita.fechaInicio = this.fechaCitaCompleta;
	this.cita.servicio = servicio;
	this.cita.corte = corte;
	this.cita.estilo = estilo;
	this.cita.usuario = this.usuario;
	this.cita.precio = this.totalPrecio;
	this.cita.nombre = this.formulario.get('nombre')?.value;
	this.citaService.añadirCita(this.cita).subscribe(
			(data) => {
				this.nuevaCita.emit(this.cita);
				this.totalPrecio = 0;
			 	 this.totalTiempo = 0;
			 	 this.serviciosSeleccionados.splice(0, this.serviciosSeleccionados.length);
			 	 this.actualizarNumCitas();
			 	 this.alert.show("success","Reserva realizada con exito");
			},(error) => {
				console.log(error);
				this.totalPrecio = 0;
			 	 this.totalTiempo = 0;
			 	 this.serviciosSeleccionados.splice(0, this.serviciosSeleccionados.length);
			}
			
		)
	
	}
}
