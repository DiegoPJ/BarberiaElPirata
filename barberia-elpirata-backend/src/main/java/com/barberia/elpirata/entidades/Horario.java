package com.barberia.elpirata.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor
@Table(name = "horarios")
public class Horario {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
    @Column(name="diaSemana", unique=true)
	private String diaSemana;
	
	private String hora_apertura_manana;
	private String hora_cierre_manana;
	private String hora_apertura_tarde;
	private String hora_cierre_tarde;
	
	public Horario(String diaSemana, String hora_apertura_manana, String hora_cierre_manana, String hora_apertura_tarde,
			String hora_cierre_tarde) {
		super();
		this.diaSemana = diaSemana;
		this.hora_apertura_manana = hora_apertura_manana;
		this.hora_cierre_manana = hora_cierre_manana;
		this.hora_apertura_tarde = hora_apertura_tarde;
		this.hora_cierre_tarde = hora_cierre_tarde;
	}
	
	
}
