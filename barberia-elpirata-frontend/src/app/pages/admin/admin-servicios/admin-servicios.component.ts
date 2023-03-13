import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { Corte, Estilo, Servicio } from 'src/app/model';
import { CarroService } from 'src/app/services/carro.service';
import { ListaServiciosService } from 'src/app/services/lista-servicios.service';

@Component({
  selector: 'app-admin-servicios',
  templateUrl: './admin-servicios.component.html',
  styleUrls: ['./admin-servicios.component.css']
})
export class AdminServiciosComponent implements OnInit {
   
	@ViewChild(AlertComponent) alert: AlertComponent;
  		servicios :Servicio[] = [];
		nuevoServicio : Servicio = {
		  id:-1,
	  	  nombre: '',
		  imagen: '',
		  precio: 0,
		  tiempo: 0,
		  extra:  '',
    	  cortes: [] as Corte[]
	};
	    cortes: Corte[];

		nuevoCorte : Corte = {
		  id:-1,
	  	  nombre: '',
		  imagen: '',
		  precio: 0,
		  tiempo: 0,
		  extra: '',
  		  servicio : {} as Servicio,
		  estilos:[] as Estilo []
	};
	estilos :Estilo[];

	nuevoEstilo : Estilo = {
		  id:-1,
	  	  nombre: '',
		  imagen: '',
		  precio: 0,
		  tiempo: 0,
		  extra: '',
		  corte : {} as Corte
	};
	
	constructor(private listaServiciosService:ListaServiciosService){		
					
	}
 ngOnInit(): void {
//SERVICIOS
	forkJoin({
      servicios: this.listaServiciosService.todaLaListaDeServicios(),
      cortes: this.listaServiciosService.todaLaListaDeServiciosCorte(),
      estilos: this.listaServiciosService.todaLaListaDeServiciosEstilo()
    }).subscribe(
      ({ servicios, cortes, estilos }) => {
        this.servicios = servicios;
        this.cortes = cortes;
        this.estilos = estilos;
        for (const corte of cortes) {
          corte.estilos = estilos.filter(e => e.corte.id === corte.id);
        }
        for (const barberia of servicios) {
          barberia.cortes = cortes.filter(c => c.servicio.id === barberia.id);
        }
      }
    );    
    
    }
    actualizarLista(){
		forkJoin({
      servicios: this.listaServiciosService.todaLaListaDeServicios(),
      cortes: this.listaServiciosService.todaLaListaDeServiciosCorte(),
      estilos: this.listaServiciosService.todaLaListaDeServiciosEstilo()
    }).subscribe(
      ({ servicios, cortes, estilos }) => {
        this.servicios = servicios;
        this.cortes = cortes;
        this.estilos = estilos;
        for (const corte of cortes) {
          corte.estilos = estilos.filter(e => e.corte.id === corte.id);
        }
        for (const barberia of servicios) {
          barberia.cortes = cortes.filter(c => c.servicio.id === barberia.id);
        }
      }
    ); 
	}
  agregarServicio() {
    this.listaServiciosService.añadirServicio(this.nuevoServicio).subscribe(
      (response) => {
        this.alert.show('success', 'El servicio se ha agregado exitosamente.');
        // Limpiar el formulario y el objeto nuevoServicio
        this.nuevoServicio = {
		  id:-1,
          nombre: '',
          imagen: '',
          precio: 0,
          tiempo: 0,
          extra: '',
          cortes: [] as Corte[]
        };
        this.actualizarLista();
      },
      (error) => {
        this.alert.show('danger', 'Ha ocurrido un error al agregar el servicio.');
      }
    );
  }	
agregarCorte(servicio: Servicio) {
	this.nuevoCorte.servicio = servicio;
	console.log(this.nuevoCorte);
	
	this.listaServiciosService.añadirCorte(this.nuevoCorte).subscribe(
      (response) => {
        this.alert.show('success', 'El servicio se ha agregado exitosamente.');
        // Limpiar el formulario y el objeto nuevoServicio
        this.nuevoCorte = {
		  id:-1,
          nombre: '',
          imagen: '',
          precio: 0,
          tiempo: 0,
          extra: '',
  		  servicio: {} as Servicio,
          estilos: [] as Estilo[]
        };
                this.actualizarLista();

      },
      (error) => {
        this.alert.show('danger', 'Ha ocurrido un error al agregar el servicio.');
      }
    );
  };
agregarEstilo(corte : Corte) {
	this.nuevoEstilo.corte = corte;
	this.listaServiciosService.añadirEstilo(this.nuevoEstilo).subscribe(
      (response) => {
        this.alert.show('success', 'El servicio se ha agregado exitosamente.');
        // Limpiar el formulario y el objeto nuevoServicio
        this.nuevoEstilo = {
		  id:-1,
          nombre: '',
          imagen: '',
          precio: 0,
          tiempo: 0,
          extra: '',
  		  corte: {} as Corte,
        };
                this.actualizarLista();

      },
      (error) => {
        this.alert.show('danger', 'Ha ocurrido un error al agregar el servicio.');
      }
    );
/*  this.cortePush.nombre = this.nuevoCorte.nombre;
  this.cortePush.precio = Number(this.nuevoCorte.precio);
  this.cortePush.imagen = this.nuevoCorte.imagen;
  this.cortePush.tiempo = Number(this.nuevoCorte.tiempo)
  this.cortePush.extra = this.nuevoCorte.extra;*/
  };


	editarServicio(servicio : Servicio){}
eliminarServicio(servicio: Servicio) {
  this.listaServiciosService.eliminarServicio(servicio.id).subscribe(
    (response) => {
      this.servicios = this.servicios.filter(s => s !== servicio);
      this.alert.show('success', 'El servicio se ha eliminado exitosamente.');
              this.actualizarLista();

    },
    (error) => {
      this.alert.show('danger', 'Ha ocurrido un error al eliminar el servicio.');
    }
  );
}

	editarCorte(corte: Corte){}
eliminarCorte(corte: Corte){
    this.listaServiciosService.eliminarCorte(corte.id)
      .subscribe(
        (response) => {
          this.alert.show('success', 'El corte se ha eliminado exitosamente.');
                  this.actualizarLista();

        },
        (error) => {
          this.alert.show('danger', 'Ha ocurrido un error al eliminar el corte.');
        }
      );
  }
	editarEstilo(estilo : Estilo){}
eliminarEstilo(estilo: Estilo){
    this.listaServiciosService.eliminarEstilo(estilo.id)
      .subscribe(
        (response) => {
          this.alert.show('success', 'El estilo se ha eliminado exitosamente.');
                  this.actualizarLista();

        },
        (error) => {
          this.alert.show('danger', 'Ha ocurrido un error al eliminar el estilo.');
        }
      );
  }

}
