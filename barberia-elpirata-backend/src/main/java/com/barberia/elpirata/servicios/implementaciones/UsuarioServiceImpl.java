package com.barberia.elpirata.servicios.implementaciones;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.barberia.elpirata.entidades.AuthorityName;
import com.barberia.elpirata.entidades.Rol;
import com.barberia.elpirata.entidades.Usuario;
import com.barberia.elpirata.repositorios.RolRepository;
import com.barberia.elpirata.repositorios.UsuarioRepository;
import com.barberia.elpirata.seguridad.TokenUtils;
import com.barberia.elpirata.servicios.EmailService;
import com.barberia.elpirata.servicios.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private RolRepository rolRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private EmailService emailService;
	
	@Override
	public Usuario guardarUsuario(Usuario usuario) throws Exception {
		Usuario usuarioLocal = usuarioRepository.findByEmail(usuario.getEmail());

		if (usuarioLocal != null) {
			System.out.println("El usuario ya existe");
			throw new Exception("El usuario ya existe");
		} else {
			String password = usuario.getContraseña();
			String encodedPassword = passwordEncoder.encode(password);
			usuario.setContraseña(encodedPassword);
			if (usuario.getRoles() == null || usuario.getRoles().isEmpty()) {
				Rol rolUsuario = new Rol();
				rolUsuario.setNombre(AuthorityName.ROLE_USUARIO);
				List<Rol> roles = new ArrayList<>();
				roles.add(rolUsuario);
				usuario.setRoles(roles);
			}

			usuarioLocal = usuarioRepository.save(usuario);
		}
		return usuarioLocal;
	}

	@Override
	public Usuario obtenerEmail(String email) {
		return usuarioRepository.findByEmail(email);
	}

	@Override
	public void eliminarUsuario(Long usuarioId) {
		usuarioRepository.deleteById(usuarioId);
	}

	@Override
	public void enviarEmailReinicioContraseña(String email) {
	    Usuario usuario = usuarioRepository.findByEmail(email);
	    if (usuario == null) {
	        throw new RuntimeException("Usuario no encontrado");
	    }

	    // Generar token de reinicio de contraseña y guardar en la base de datos
	    List<Rol> roles = usuario.getRoles();
	    List<GrantedAuthority> authorities = roles.stream()
	        .map(role -> new SimpleGrantedAuthority(role.getNombre().name()))
	        .collect(Collectors.toList());
	    String token = TokenUtils.createToken(usuario.getNombre(), usuario.getEmail(), authorities);
	    String enlace = "http://localhost:8080/reiniciar-contrasena?token=" + token;



	    usuario.setToken(token);
	    usuarioRepository.save(usuario);

	    // Enviar correo electrónico

	    String subject = "Solicitud de reinicio de contraseña";
	    String text = "Hola " + usuario.getNombre() + ",\n\nPara reiniciar tu contraseña, haz clic en el siguiente enlace: http://localhost:8080/reset-password?token=" + token + "\n\nSi no solicitaste este reinicio de contraseña, por favor ignora este mensaje.\n\nAtentamente,\nEl equipo de El Pirata Barbería";
	    emailService.sendEmail(email, subject, text);
	}


}