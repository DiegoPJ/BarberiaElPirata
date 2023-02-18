import { Component, OnInit } from '@angular/core';
import { Barberia, Corte, Estilo } from 'src/app/model';
import { ListaPreciosService } from 'src/app/services/lista-precios.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-lista-precios',
  templateUrl: './lista-precios.component.html',
  styleUrls: ['./lista-precios.component.css']
})
export class ListaPreciosComponent implements OnInit {
  barberias: Barberia[] = []; 
  
  constructor(private listaPreciosService: ListaPreciosService) { }
  
  ngOnInit(): void {
    forkJoin({
      barberias: this.listaPreciosService.todaLaListaDeServiciosBarberia(),
      cortes: this.listaPreciosService.todaLaListaDeServiciosCorte(),
      estilos: this.listaPreciosService.todaLaListaDeServiciosEstilo()
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