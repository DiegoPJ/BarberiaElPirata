package com.barberia.elpirata.entidades;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "citas")
public class Cita {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;

	private Date fecha;	
	public Cita() {
	}


	public Cita(int id, Usuario usuario, Date fecha, Date hora) {
		super();
		this.id = id;
		this.usuario = usuario;
		this.fecha = fecha;
	}
	
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public Usuario getUsuario() {
		return usuario;
	}


	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}


	public Date getFecha() {
		return fecha;
	}


	public void setFecha(Date date) {
		this.fecha = date;
	}




	
}
