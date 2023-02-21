import { Component,OnInit,Input, Output, EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Servicio, Corte, Estilo, Cita, Usuario } from 'src/app/model';
import { ListaServiciosService } from 'src/app/services/lista-servicios.service';
import { CitaService } from 'src/app/services/cita.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


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
				
			if (!servicioExistente) {
			  this.serviciosSeleccionados.push(x);
			  this.totalPrecio += x.precio;

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
	
	const estilo = this.serviciosSeleccionados.filter(s => s.servicio);
	const corte = this.serviciosSeleccionados.filter(s => s.corte);
	const servicio = this.serviciosSeleccionados.filter(s => !s.servicio && !s.corte);
	this.cita.fecha = this.fechaCitaCompleta;
	console.log(this.fechaCitaCompleta + " fechaCitaCompleta");
	this.cita.servicio = servicio;
	this.cita.corte = corte;
	this.cita.estilo = estilo;
	this.cita.usuario = this.usuario;
	
	this.citaService.añadirCita(this.cita).subscribe(
			(data) => {
				 this.nuevaCita.emit();
				console.log(data)
			},(error) => {
				console.log(error);
				
			}
			
		)
	
	}
}
