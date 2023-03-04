package com.barberia.elpirata.seguridad;

import org.springframework.security.core.GrantedAuthority;

import com.barberia.elpirata.entidades.Rol;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class SecurityAuthority implements GrantedAuthority {
	
	private final Rol rol;
	
	@Override
	public String getAuthority() {
		return rol.getNombre().toString();
	}

}
