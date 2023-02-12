package com.barberia.elpirata.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor 
public class Horario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
    @Column(name="diaSemana", unique=true)
	private String diaSemana;
	
	private String hora_apertura_mañana;
	private String hora_cierre_mañana;
	private String hora_apertura_tarde;
	private String hora_cierre_tarde;
	
	
	public Horario(String diaSemana, String hora_apertura_mañana, String hora_cierre_mañana, String hora_apertura_tarde,
			String hora_cierre_tarde) {
		
		super();
		this.diaSemana = diaSemana;
		this.hora_apertura_mañana = hora_apertura_mañana;
		this.hora_cierre_mañana = hora_cierre_mañana;
		this.hora_apertura_tarde = hora_apertura_tarde;
		this.hora_cierre_tarde = hora_cierre_tarde;
	}

	
	
	
	
}
