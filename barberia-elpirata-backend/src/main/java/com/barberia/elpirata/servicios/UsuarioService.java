package com.barberia.elpirata.servicios;

import java.util.Set;

import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.entidades.UsuarioRol;


public interface UsuarioService {

	public Usuario guardarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles) throws Exception;
	public Usuario obtenerEmail(String email);
	public void eliminarUsuario(Long usuarioId);

}
