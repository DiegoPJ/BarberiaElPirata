package com.barberia.elpirata.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class UsuarioRol {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long usuarioRolId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Usuario usuario_usuRol;
	
	@ManyToOne
	private Rol rol_usuRol;
	
	public UsuarioRol() {
		
	}

	public Long getUsuarioRolId() {
		return usuarioRolId;
	}

	public void setUsuarioRolId(Long usuarioRolId) {
		this.usuarioRolId = usuarioRolId;
	}

	public Usuario getUsuario() {
		return usuario_usuRol;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario_usuRol = usuario;
	}

	public Rol getRol() {
		return rol_usuRol;
	}

	public void setRol(Rol rol) {
		this.rol_usuRol = rol;
	}
	
}
