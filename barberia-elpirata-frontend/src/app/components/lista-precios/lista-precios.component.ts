import { Component,OnInit } from '@angular/core';
import { Barberia } from 'src/app/model';
import { CitaService } from 'src/app/services/cita.service';
import { ListaPreciosService } from 'src/app/services/lista-precios.service';

@Component({
  selector: 'app-lista-precios',
  templateUrl: './lista-precios.component.html',
  styleUrls: ['./lista-precios.component.css']
})
export class ListaPreciosComponent implements OnInit {
	
	listas: Barberia[]; 
	constructor(private listaPreciosService:ListaPreciosService){
		
	}
    ngOnInit(): void {
		this.listaPreciosService.todaLaListaDeServicios().subscribe(lista => {
		      	this.listas = lista;  
		      	console.log(lista);  	      				 
		    	});    }
	
}
