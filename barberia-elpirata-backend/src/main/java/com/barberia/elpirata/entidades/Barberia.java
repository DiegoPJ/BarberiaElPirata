package com.barberia.elpirata.entidades;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Barberia{
	  
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String nombre;
	private int precio;
	private String imagen;
	private String extra;
	  
	@OneToMany(mappedBy = "barberia", cascade = CascadeType.ALL)
	private List<Corte> cortes;
}
