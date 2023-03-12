package com.barberia.elpirata.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data @AllArgsConstructor @NoArgsConstructor
@Table(name = "estilos")
public class Estilo {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
	 
	  @ManyToOne
	  @JoinColumn(name = "id_corte")
	  private Corte corte;
    
    
    private String nombre;
    
    private Double precio;
    
    private String imagen;
    
    private String extra;
    
    private int tiempo;
}
