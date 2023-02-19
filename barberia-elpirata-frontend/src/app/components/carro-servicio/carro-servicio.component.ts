import { Component,OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Barberia, Corte, Estilo } from 'src/app/model';
import { ListaServiciosService } from 'src/app/services/lista-servicios.service';

@Component({
  selector: 'app-carro-servicio',
  templateUrl: './carro-servicio.component.html',
  styleUrls: ['./carro-servicio.component.css']
})
export class CarroServicioComponent implements OnInit {
	barberias :Barberia[] = [];
	cortes : Corte[] = [];
	estilos : Estilo[] = [];

constructor(private listaServiciosService:ListaServiciosService){
	
}
    ngOnInit(): void {
        forkJoin({
      barberias: this.listaServiciosService.todaLaListaDeServiciosBarberia(),
      cortes: this.listaServiciosService.todaLaListaDeServiciosCorte(),
      estilos: this.listaServiciosService.todaLaListaDeServiciosEstilo()
    }).subscribe(
      ({ barberias, cortes, estilos }) => {
        this.barberias = barberias;
        for (const corte of cortes) {
          corte.estilos = estilos.filter(e => e.corte.id === corte.id);
        }
        for (const barberia of barberias) {
          barberia.cortes = cortes.filter(c => c.barberia.id === barberia.id);
        }
      }
    );
    }
    

modalCortes(barberia: Barberia) {
  this.cortes = barberia.cortes;
}
modalEstilos(corte: Corte) {
  this.estilos = corte.estilos;
}
}
