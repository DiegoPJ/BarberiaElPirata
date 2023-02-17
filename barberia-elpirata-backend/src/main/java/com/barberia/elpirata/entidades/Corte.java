package com.barberia.elpirata.entidades;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Corte {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "id_barberia")
    private Barberia barberia;
    
    private String nombre;
    
    private Double precio;
    
    private String imagen;
    
    private String suplemento;
    
    @OneToMany(mappedBy = "corte", cascade = CascadeType.ALL)
    private List<Estilo> estilos;

}
