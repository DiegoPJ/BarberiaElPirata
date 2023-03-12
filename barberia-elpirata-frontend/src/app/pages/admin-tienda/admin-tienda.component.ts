import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/model';
import { CarroService } from 'src/app/services/carro.service';


@Component({
  selector: 'app-admin-tienda',
  templateUrl: './admin-tienda.component.html',
  styleUrls: ['./admin-tienda.component.css']
})

export class AdminTiendaComponent implements OnInit {
	productos : Producto[] = [];
	@ViewChild('contenedor') contenedor : ElementRef;
	@ViewChild('header') header : ElementRef;
	@ViewChild('carroProductos') carroProductos : ElementRef;
    productoEditable: Producto;
	  productoForm: FormGroup;
	    productoEliminar: Producto;

	constructor(private carroService: CarroService, private formBuilder: FormBuilder){
	}
    ngOnInit(): void {
		this.productoEditable ={
			'id':-1,cantidad:0,descripcion:'',imagen:'',nombre:'',precio:0
		}
        this.carroService.todosLosProductos()
			  .subscribe(
			    (productos) => {
			      this.productos = productos;
			    },
			    (error) => {
			      // Se ejecuta cuando ocurre un error
			      console.log(error);
			    }
			  );
			   this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')
]],
      cantidad: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')
]],
      imagen: ['', Validators.required]
    });
    }
     agregarProducto() {
		 
		  if (this.productoForm.valid) {
      const producto: Producto = {
        nombre: this.productoForm.value.nombre,
        precio: this.productoForm.value.precio,
        cantidad: this.productoForm.value.cantidad,
        imagen: this.productoForm.value.imagen,
        descripcion: '',
        id: -1
      };
		 
	this.carroService.añadirProducto(producto).subscribe(
		(productoActualizado) => {
		console.log(productoActualizado);
				this.actualizarProductos();

		// Manejar la respuesta del servidor aquí
		},
		(error) => {
		console.log(error);
		// Manejar el error aquí
		}
	);
}
}
actualizarProductos(){
	this.carroService.todosLosProductos()
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
  editarProducto() {
	this.carroService.añadirProducto(this.productoEditable).subscribe(
		(productoActualizado) => {
		console.log(productoActualizado);
		this.actualizarProductos();
		// Manejar la respuesta del servidor aquí
		},
		(error) => {
		console.log(error);
		// Manejar el error aquí
		}
	);
}

	eliminarProducto() {
		this.carroService.eliminarProducto(this.productoEliminar.id).subscribe(
			() => {
						this.actualizarProductos();

				console.log("Producto eliminado");
				// Manejar la respuesta del servidor aquí
			},
			(error) => {
				console.log(error);
				// Manejar el error aquí
			}
		);
	}
}








	

