package com.barberia.elpirata.entidades;
import java.util.Objects;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
@Table(name = "cita")
public class Cita {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;

	private double precio;
	
	@ManyToMany(cascade = CascadeType.ALL)
	private List<Servicio> servicio = new ArrayList<>();
	
	@ManyToMany(cascade = CascadeType.ALL)
	private List<Corte> corte = new ArrayList<>();
	
	@ManyToMany(cascade = CascadeType.ALL)
	private List<Estilo> estilo = new ArrayList<>();
	
	private Timestamp fechaInicio;	
	private Timestamp fechaFin;	

	@Override
	public boolean equals(Object o) {
	    if (this == o) return true;
	    if (o == null || getClass() != o.getClass()) return false;
	    Cita cita = (Cita) o;
	    return id.equals(cita.id);
	}

	@Override
	public int hashCode() {
	    return Objects.hash(id);
	}
	
	
}
