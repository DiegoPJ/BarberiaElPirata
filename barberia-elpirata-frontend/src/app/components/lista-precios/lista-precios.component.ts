import { Component, OnInit } from '@angular/core';
import { Barberia, Corte, Estilo } from 'src/app/model';
import { ListaServiciosService } from 'src/app/services/lista-servicios.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-lista-precios',
  templateUrl: './lista-precios.component.html',
  styleUrls: ['./lista-precios.component.css']
})
export class ListaPreciosComponent implements OnInit {
  barberias: Barberia[] = []; 
  
  constructor(private listaServiciosService: ListaServiciosService) { }
  
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
}