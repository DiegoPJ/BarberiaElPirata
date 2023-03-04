package com.barberia.elpirata.seguridad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.repositorios.UsuarioRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepository
		.findOneByEmail(email)
		.orElseThrow(() -> new UsernameNotFoundException("El usuario con email" + email + " no existe."));
		
		return new UserDetailsImpl(usuario,usuario.getRoles());
	}

}
