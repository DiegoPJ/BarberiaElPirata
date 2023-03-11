import { Component, ElementRef, HostListener, ViewChild, OnInit } from '@angular/core';
import { Producto } from 'src/app/model';
import { CarroService } from 'src/app/services/carro.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit{

	productos : Producto[] = [];
	@ViewChild('contenedor') contenedor : ElementRef;
	@ViewChild('header') header : ElementRef;
	@ViewChild('carroProductos') carroProductos : ElementRef;
	
constructor(private carroService: CarroService) {
	
 }
    ngOnInit(): void {
        this.carroService.todosLasCitas()
			  .subscribe(
			    (productos) => {
			      this.productos = productos;
			    },
			    (error) => {
			      // Se ejecuta cuando ocurre un error
			      console.log(error);
			    }
			  );
			   	
    }
	 		@HostListener('window:scroll', ['$event']) onScroll() {
			if (this.contenedor.nativeElement.getBoundingClientRect().top < 10) {
				this.header.nativeElement.classList.add("scroll");
			} else {
				this.header.nativeElement.classList.remove("scroll");
			}  	}
	
}

