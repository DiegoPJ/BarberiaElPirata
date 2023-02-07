package com.barberia.elpirata;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.barberia.elpirata.entidades.Rol;
import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.entidades.UsuarioRol;
import com.barberia.elpirata.servicios.UsuarioService;

@SpringBootApplication
public class BarberiaElpirataBackendApplication implements CommandLineRunner{

	@Autowired 
	private UsuarioService usuarioService;
	
	public static void main(String[] args) {
		SpringApplication.run(BarberiaElpirataBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
 /*
		//creas usuario
		Usuario usuario = new Usuario();
		usuario.setNombre("Diego");
		usuario.setApellido("pastor");
		usuario.setEmail("d@d.com");
		usuario.setUsername("emca");
		usuario.setPassword("0000");
		usuario.setTelefono("222");
		usuario.setPerfil("foto.png");
		usuario.equals(true);
		
		//creas rol
		Rol rol = new Rol();
		rol.setRolId(1L);
		rol.setNombre("admin");
		
		//creas mapa
		Set<UsuarioRol> usuarioRoles = new HashSet<>();
		//crear la asociacion entre los dos
		UsuarioRol usuarioRol = new UsuarioRol();
		usuarioRol.setRol(rol);
		usuarioRol.setUsuario(usuario);
		usuarioRoles.add(usuarioRol);
		
		Usuario usuarioGuardado = usuarioService.guardarUsuario(usuario,usuarioRoles);
		
		System.out.println(usuarioGuardado.getUsername());
	*/}

}
