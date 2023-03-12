package com.barberia.elpirata.entidades;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
@Table(name = "cortes")
public class Corte {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "id_servicio")
    private Servicio servicio;
    
    private String nombre;
    
    private Double precio;
    
    private String imagen;
    
    private String extra;
    
    private int tiempo;
    
    @OneToMany(mappedBy = "corte", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Estilo> estilos;

}
