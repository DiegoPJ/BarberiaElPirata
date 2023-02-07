package com.barberia.elpirata.seguridad;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.barberia.elpirata.entidades.Usuario;

public class UserDetailsImpl implements UserDetails {

	
	private  Usuario usuario;
	
	public UserDetailsImpl(Usuario usuario) {
		super();
		this.usuario = usuario;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return Collections.emptyList();
	}

	@Override
	public String getPassword() {
		return usuario.getContraseña();
	}

	@Override
	public String getUsername() {
		return usuario.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
	public String getNombre() {
		return usuario.getNombre();
	}
	

}
