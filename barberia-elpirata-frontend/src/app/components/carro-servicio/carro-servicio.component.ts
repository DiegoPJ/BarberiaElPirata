import { Component,OnInit,Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Servicio, Corte, Estilo, Cita, Usuario } from 'src/app/model';
import { ListaServiciosService } from 'src/app/services/lista-servicios.service';
import { CitaService } from 'src/app/services/cita.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { AlertComponent } from 'src/app/components/alert/alert.component';


@Component({
  selector: 'app-carro-servicio',
  templateUrl: './carro-servicio.component.html',
  styleUrls: ['./carro-servicio.component.css']
})
export class CarroServicioComponent implements OnInit {
	totalPrecio: number = 0;
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

constructor(private listaServiciosService:ListaServiciosService,
			private citaService:CitaService,
			private userService:UserService,
			private datePipe: DatePipe){
	
}
    ngOnInit(): void {
			
			this.credenciales = localStorage.getItem("credencial");
			this.userService.obtenerEmail(this.credenciales)
			  .subscribe(
			    (usuario) => {
			      this.usuario = usuario;
			    },
			    (error) => {
			      // Se ejecuta cuando ocurre un error
			      console.log(error);
			    }
			  );			
		 	this.cita = {
			id: 0,
			fecha: new Date(),
			usuario: { id: 0,nombre:"0",email:"0",telefono:"0",password:"0" },
			corte: [],
			estilo: [],
			servicio: []
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
    }
	seleccionarServicio(x: any) {
			const nombre = x.corte?.servicio.nombre || x.servicio?.nombre || x.nombre;
			
			console.log(this.tituloSeleccionado)
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
			}else{
				console.log(JSON.stringify(servicioExistente));
			}
					
	}
	quitarServicio(x: any) {
	  const index = this.serviciosSeleccionados.indexOf(x);
	  if (index !== -1) {
	    this.serviciosSeleccionados.splice(index, 1);
	          this.totalPrecio -= x.precio;

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
	guardarCita(){
	
	const corte = this.serviciosSeleccionados.filter(s => s.servicio);
	const estilo = this.serviciosSeleccionados.filter(s => s.corte);
	const servicio = this.serviciosSeleccionados.filter(s => !s.servicio && !s.corte);
	this.cita.fecha = this.fechaCitaCompleta;
	console.log(this.fechaCitaCompleta + " fechaCitaCompleta");
	this.cita.servicio = servicio;
	this.cita.corte = corte;
	this.cita.estilo = estilo;
	this.cita.usuario = this.usuario;
	
	this.citaService.añadirCita(this.cita).subscribe(
			(data) => {
				this.nuevaCita.emit(this.cita);
				this.serviciosSeleccionados.splice(0, this.serviciosSeleccionados.length);
				console.log(data)
			},(error) => {
				console.log(error);
				
			}
			
		)
	
	}
}
