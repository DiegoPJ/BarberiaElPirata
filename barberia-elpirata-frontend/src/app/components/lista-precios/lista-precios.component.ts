import { Component, OnInit } from '@angular/core';
import { Servicio, Corte, Estilo } from 'src/app/model';
import { ListaServiciosService } from 'src/app/services/lista-servicios.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-lista-precios',
  templateUrl: './lista-precios.component.html',
  styleUrls: ['./lista-precios.component.css']
})
export class ListaPreciosComponent implements OnInit {
  servicios: Servicio[] = []; 
  
  constructor(private listaServiciosService: ListaServiciosService) { }
  
  ngOnInit(): void {
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
        for (const servicio of servicios) {
          servicio.cortes = cortes.filter(c => c.servicio.id === servicio.id);
        }
      }
    );
  }
}