package com.barberia.elpirata.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Estilo {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
	 
	  @ManyToOne
	  @JoinColumn(name = "corte_id")
	  private Corte corte;
    
    
    private String nombre;
    
    private Double precio;
    
    private String imagen;
    
    private String suplemento;
}
