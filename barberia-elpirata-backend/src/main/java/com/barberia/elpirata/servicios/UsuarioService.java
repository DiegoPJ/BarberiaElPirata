package com.barberia.elpirata.servicios;

import java.util.Set;

import com.barberia.elpirata.entidades.Usuario;


public interface UsuarioService {

	public Usuario guardarUsuario(Usuario usuario) throws Exception;
	public Usuario obtenerEmail(String email);
	public void eliminarUsuario(Long usuarioId);
	public void enviarEmailReinicioContraseña(String email);

}
